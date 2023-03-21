import { PostBusiness } from "../../src/business/PostBusiness"
import { EditPostInputDTO } from "../../src/dtos/postDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"


describe("editPost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )

    test("Edit bem-sucedido em conta normal retorna mensagem.", async () => {        
        
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            content: "content-mock-1",
            token: "token-mock-normal"
        }
        
        const response = await postBusiness.editPost(input)
        expect(response.message).toBe("Post editado com sucesso")
    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input: EditPostInputDTO = {                
                idToEdit: "id-mock",
                content: "content-mock-1",
                token: undefined
            }

            await postBusiness.editPost(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token ausente")
                expect(error.statusCode).toBe(400)
            }
        }     

    })

    test("deve disparar erro caso token seja inválido", async () => {
        
        expect.assertions(2)

        try {

            const input: EditPostInputDTO = {
                idToEdit: "id-mock",
                content: "content-mock-1",
                token: "token-incorreto"
            }

            await postBusiness.editPost(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }

    })

    test("deve disparar erro caso content não seja string", async () => {
        
        expect.assertions(2)

        try {

            const input: EditPostInputDTO = {
                idToEdit: "id-mock",
                content: true,
                token: "token-mock-normal"
            }

            await postBusiness.editPost(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'content' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("deve disparar erro caso o id não seja encontrado", async () => {
        
        expect.assertions(2)

        try {

            const input: EditPostInputDTO = {
                idToEdit: "id-mock-inexistente",
                content: "true",
                token: "token-mock-normal"
            }

            await postBusiness.editPost(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'id' do post não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }
    })
    
})