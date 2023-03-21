import { PostBusiness } from "../../src/business/PostBusiness"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { USER_ROLES } from "../../src/types"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../mocks/PostDatabaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"


describe("getPosts", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new TokenManagerMock(),
        new IdGeneratorMock()
    )

    test("deve retornar uma lista de Posts", async () => {
        const input = {
            q: undefined,
            token: "token-mock-normal"
        }

        const response = await postBusiness.getPosts(input)
        expect(response).toHaveLength(1)
        expect(response).toContainEqual(
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
                    role: USER_ROLES.NORMAL,
                } 
            }
        
        )
    })

    test("deve disparar erro caso token não seja uma informado", async () => {
        
        expect.assertions(2)

        try {

            const input = {
                q: undefined,
                token: undefined
            }

            await postBusiness.getPosts(input)

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
                q: "undefined",
                token: "token-incorreto"
            }

            await postBusiness.getPosts(input)

        } catch (error) {
            if(error instanceof BadRequestError) {
                expect(error.message).toBe("token inválido")
                expect(error.statusCode).toBe(400)
            }
        }    

    })

    
})