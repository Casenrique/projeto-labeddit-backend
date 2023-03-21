import { PostBusiness } from "../../src/business/PostBusiness"
import { CreatePostInputDTO } from "../../src/dtos/postDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"


describe("createPost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )

    test("create bem-sucedido em conta normal retorna mensagem.", async () => {        
        
        const input: CreatePostInputDTO = {
            content: "content-mock-1",
            token: "token-mock-normal"
        }
        
        const response = await postBusiness.createPost(input)
        expect(response.message).toBe("Post criado com sucesso!")
    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input = {
                content: "content-mock-1",
                token: undefined
            }

            await postBusiness.createPost(input)

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

            const input = {
                content: "content-mock-1",
                token: "token-incorreto"
            }

            await postBusiness.createPost(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }

    })

    test("deve disparar erro caso content não seja string",async () => {
        
        expect.assertions(2)

        try {

            const input = {
                content: true,
                token: "token-mock-normal"
            }

            await postBusiness.createPost(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("'content' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })


    
})