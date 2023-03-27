import { CommentBusiness } from "../../src/business/CommentBusiness"
import { GetCommentsInputDTO } from "../../src/dtos/commentDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"



describe("getPostComments", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new PostDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )
    test("deve retornar uma lista de Comments de um determinado post", async () => {
        
        const input: GetCommentsInputDTO = {
            idToReply: "id-mock",
            token: "token-mock-normal"
        }

        const response = await commentBusiness.getPostComments(input)
        expect(response).toHaveLength(2)
        expect(response).toContainEqual(
            {
                id: "id-mock",
                content: "content-mock-1",
                likes: 2,
                dislikes: 1,
                commentCreatedAt: expect.any(String),
                commentUpdatedAt: expect.any(String),
                commentCreatorId: "id-mock",
                postId: "id-mock",
                commentCreatorNickName: "Normal Mock"
            }        
        )
    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input: GetCommentsInputDTO = {
                idToReply: "id-mock",
                token: undefined
            }

            await commentBusiness.getPostComments(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }     

    })

    test("deve disparar erro caso token seja inválido",async () => {
        
        expect.assertions(2)

        try {

            const input: GetCommentsInputDTO = {
                idToReply: "id-mock",
                token: "token-incorreto"
            }

            await commentBusiness.getPostComments(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }    

    })

    test("deve disparar erro caso o id não seja encontrado", async () => {
        
        expect.assertions(2)

        try {

            const input: GetCommentsInputDTO = {
                idToReply: "id-mock-inexistente",
                token: "token-mock-normal"
            }

            await commentBusiness.getPostComments(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'id' do post não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }
    })


})