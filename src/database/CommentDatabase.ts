import { CommentDB, PostWithCommentsDB, PostWithCreatorDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { PostDatabase } from "./PostDatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_COMMENTS = "comments"
    public static TABLE_POST_COMMENTS = "post_comments"

    public getPostsWithCreatorAndComments = async (postId: string) => {
        let [postsWithCreatorDB]: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id AS postCreatorId",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.replies",
                "posts.created_at AS postCreatedAt",
                "posts.updated_at AS postUpdatedAt",
                "users.nick_name AS creatorNickName"
            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where(`posts.id`, postId )

        const postComments: PostWithCommentsDB[] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)        
            .select(
                "comments.id",
                "comments.creator_id AS commentCreatorId",
                "users.nick_name AS commentCreatorNickName",
                "comments.post_id AS postId",
                "comments.content",
                "comments.likes",
                "comments.dislikes",
                "comments.created_at AS commentCreatedAt",
                "comments.updated_at AS commentUpdatedAt",
            )
            .join("users", "comments.creator_id", "=", "users.id")
            .where("comments.post_id", postId)
        
        const postWithCreatorAndComments = {
            ...postsWithCreatorDB,
            comments: postComments
        }
            
        return postWithCreatorAndComments 
    }

    public insert = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .insert(commentDB)
    }
}