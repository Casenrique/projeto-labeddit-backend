import { Request, Response } from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { CreateCommentInputDTO, CreateCommentOutputDTO, GetCommentsInputDTO } from "../dtos/commentDTO"
import { BaseError } from "../errors/BaseError"

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) {}

    public getComments = async (req: Request, res: Response) => {
        try {
            const input: GetCommentsInputDTO = {
                token: req.headers.authorization,
                idToReply: req.params.id
            }

            const output = await this.commentBusiness.getComments(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createComment = async (req: Request, res: Response) => {
        try {
            const input: CreateCommentInputDTO = {
                token: req.headers.authorization,
                content: req.body.content,
                idToComment: req.params.id
            }

            await this.commentBusiness.createComment(input)
            
            const output: CreateCommentOutputDTO = {
                message: "Comentário criado com sucesso"
            }

            res.status(200).send(output)

        } catch (error) {
            console.log(error)

            if(error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }



}