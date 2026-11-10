import { expect} from "@playwright/test"
// как получить токен?
export async function getAuthToken(request,baseUrl) {
       const responseAuth = await request.post(baseUrl+"/auth/login",{data:
           {
            email: process.env.EVENTHUB_EMAIL,
            password: process.env.EVENTHUB_PASSWORD
           }
        })
        expect(responseAuth.status()).toBe(200);
        const authBody = await responseAuth.json();
        expect(authBody.success).toBe(true)
        const token = authBody.token;
        expect(typeof token).toBe("string")
        expect(token.length).toBeGreaterThan(0)
        return token
} 