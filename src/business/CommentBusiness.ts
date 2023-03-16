import { CommentDatabase } from "../database/CommentDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreateCommentInputDTO, GetCommentsInputDTO, GetPostWithCommentsOutputDTO } from "../dtos/commentDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CommentModel, CreatorPost, PostCreatorModel, PostDB, PostWithCommentsModel, PostWithCreatorDB, UserDB } from "../types";



export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) {}

    public getComments = async (input: GetCommentsInputDTO) => {
        
        const { token, idToReply } = input

        if(token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("token inválido")
        }

        const postWithCreatorDB: PostWithCreatorDB = 
            await this.commentDatabase.getPostsWithCreatorAndComments(idToReply)

        
        if(!postWithCreatorDB) {
            throw new NotFoundError("'id' do post não encontrado.")   
        }

        // const output: GetPostWithCommentsOutputDTO = {
        //     post: postWithCreatorDB
        // }

        console.log(postWithCreatorDB)
        return postWithCreatorDB
    }

    public createComment = async (input: CreateCommentInputDTO): Promise<void> => {
        
        const { content, token, idToComment } = input
       
        if(token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError("token inválido")
        }

        if(typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const postWithCreatorDB: PostWithCreatorDB | undefined = await this.postDatabase.getPostWithCreatorById(idToComment)

        if(!postWithCreatorDB) {
            throw new BadRequestError("'id' não encontrado")
        }

        const commentId = this.idGenerator.generate()
        const commentCreatorId = payload.id
        const commentCreatorNickName = payload.nickName
        const commentCreatedAt = new Date().toISOString()
        const commentUpdatedAt = new Date().toISOString()

        function getCreator(postCreatorId: string, postCreatorNickName: string): CreatorPost {
            return {
                id: postCreatorId,
                nickName: postCreatorNickName
            }
        }

        const updatedPost = new Post (
            postWithCreatorDB.id,
            postWithCreatorDB.content,
            postWithCreatorDB.likes,
            postWithCreatorDB.dislikes,
            postWithCreatorDB.replies,
            postWithCreatorDB.created_at,
            postWithCreatorDB.updated_at,
            getCreator(postWithCreatorDB.creator_id, postWithCreatorDB.creator_nick_name)
        )

        console.log(updatedPost)

        updatedPost.addReply()

        const updatedPostDB = updatedPost.toDBModel()

        await this.postDatabase.updatePost(idToComment, updatedPostDB)

        console.log(updatedPostDB)       
        
        const comment = new Comment(
            commentId,
            content,
            0,
            0,
            commentCreatedAt,
            commentUpdatedAt,
            commentCreatorId,
            commentCreatorNickName,
            updatedPostDB.id,
            updatedPostDB.creator_id,
            updatedPostDB.content,
            updatedPostDB.likes,
            updatedPostDB.dislikes,
            updatedPostDB.replies,
            updatedPostDB.created_at,
            updatedPostDB.updated_at
        )        

        const commentDB = comment.toDBModel()

        await this.commentDatabase.insert(commentDB)

    }

    // public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO): Promise<void> => {
        
    //     const { idToLikeOrDislike, token, like } = input
       
    //     if(token === undefined) {
    //         throw new BadRequestError("token ausente")
    //     }

    //     const payload = this.tokenManager.getPayload(token)

    //     if(payload === null) {
    //         throw new BadRequestError("token inválido")
    //     }

    //     if(typeof like !== "boolean") {
    //         throw new BadRequestError("'like' deve ser boolean")            
    //     }
        
    //     const postWithCreatorDB = await this.postDatabase.getPostWithCreatorById(idToLikeOrDislike)

    //     if(!postWithCreatorDB) {
    //         throw new NotFoundError("'id' do post não encontrado.")            
    //     }

    //     const userId = payload.id
    //     const creatorId = postWithCreatorDB.creator_id
    //     const creatorNickName = postWithCreatorDB.creator_nick_name
        
    //     if(postWithCreatorDB.creator_id === userId) {
    //         throw new BadRequestError("O criador do post não pode dar like ou dislike em seu próprio post")
    //     }   
        
    //     const convertedId = like ? 1 : 0

    //     const likeDislikeDB: LikeDislikeDB = {
    //         user_id: userId,
    //         post_id: postWithCreatorDB.id,
    //         like: convertedId
    //     }
        
    //     function getCreator(creatorId: string, creatorNickName: string): CreatorPost {
    //         return {
    //             id: creatorId,
    //             nickName: creatorNickName
    //         }
    //      }

    //     const post = new Post(
    //         postWithCreatorDB.id,
    //         postWithCreatorDB.content,
    //         postWithCreatorDB.likes,
    //         postWithCreatorDB.dislikes,
    //         postWithCreatorDB.replies,
    //         postWithCreatorDB.created_at,
    //         postWithCreatorDB.updated_at,
    //         getCreator(creatorId, creatorNickName)
    //     )

    //     const likeDislikeAlreadyExists = await this.postDatabase.searchLikeDislike(likeDislikeDB)

    //     if(likeDislikeAlreadyExists === POST_LIKE.ALREADY_LIKED) {

    //         if(like) {
    //             await this.postDatabase.removeLikeDislike(likeDislikeDB)
    //             post.removeLike()
    //         } else {
    //             await this.postDatabase.updateLikeDislike(likeDislikeDB)
    //             post.removeLike()
    //             post.addDislike()
    //         }
    //     } else if(likeDislikeAlreadyExists === POST_LIKE.ALREADY_DISLIKED) {

    //         if(like) {
    //             await this.postDatabase.updateLikeDislike(likeDislikeDB)
    //             post.removeDislike()
    //             post.addLike()
    //         } else {
    //             await this.postDatabase.removeLikeDislike(likeDislikeDB)
    //             post.removeDislike()
    //         }

    //     } else {
    //         await this.postDatabase.likeOrDislikePost(likeDislikeDB)
    //         like ? post.addLike() : post.addDislike()
    //     }

    //     const updatedPostDB = post.toDBModel()
    //     await this.postDatabase.updatePost(idToLikeOrDislike, updatedPostDB)

    // }
}