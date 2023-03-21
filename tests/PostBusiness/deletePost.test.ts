import { PostBusiness } from "../../src/business/PostBusiness"
import { DeletePostInputDTO, EditPostInputDTO } from "../../src/dtos/postDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { NotFoundError } from "../../src/errors/NotFoundError"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"


describe("deletePost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )

    test("Delete bem-sucedido em conta normal retorna mensagem.", async () => {        
        
        const input: DeletePostInputDTO = {
            idToDelete: "id-mock",
            token: "token-mock-normal"
        }
        
        const response = await postBusiness.deletePost(input)
        expect(response.message).toBe("Post apagado com sucesso!")
    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input: DeletePostInputDTO = {                
                idToDelete: "id-mock",
                token: undefined
            }

            await postBusiness.deletePost(input)

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

            const input: DeletePostInputDTO = {
                idToDelete: "id-mock",
                token: "token-incorreto"
            }

            await postBusiness.deletePost(input)

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

            const input: DeletePostInputDTO = {
                idToDelete: "id-mock-inexistente",
                token: "token-mock-normal"
            }

            await postBusiness.deletePost(input)

        } catch (error) {
            if(error instanceof NotFoundError) {
                expect(error.message).toBe("'id' do post não encontrado.")
                expect(error.statusCode).toBe(404)
            }
        }
    })
    
})