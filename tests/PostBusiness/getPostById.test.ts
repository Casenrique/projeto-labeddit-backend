import { PostBusiness } from "../../src/business/PostBusiness"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"


describe("getPostById", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )

    test("deve retornar uma lista de Posts", async () => {
        const input = {
            id: "id-mock",
            token: "token-mock-normal"
        }

        const response = await postBusiness.getPostById(input)
        expect(response).toEqual(
            {
                id: "id-mock",
                content: "content-mock-1",
                likes: 1,
                dislikes: 0,
                replies: 1,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                creator: {
                    id: "id-mock",     
                    nickName: "Normal Mock",
                } 
            }
        
        )
    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input = {
                id: "id-mock",
                token: undefined
            }

            await postBusiness.getPostById(input)

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
                id: "id-mock",
                token: "token-incorreto"
            }

            await postBusiness.getPostById(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }    

    })

    
})