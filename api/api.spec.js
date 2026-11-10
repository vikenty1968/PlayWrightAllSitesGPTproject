import {expect} from "@playwright/test"
import{test}from "./fixtures/apiFixtures.js"
import { getAuthToken } from "./helpers/authHelper"
const baseUrl="https://api.eventhub.rahulshettyacademy.com/api"
test("Get all events",async({request})=>{
    const token =await getAuthToken(request,baseUrl)
const response = await request.get(baseUrl+"/events",{
    headers:{   Authorization:`Bearer ${token}`}
})

expect(response.status()).toBe(200)
const responseJson=await response.json()
expect(Array.isArray(responseJson.data)).toBe(true)
expect(responseJson.success).toBe(true)

})
//"email": "tartar@gmail.com",
 // "password": "Iamking@000"
 //"id": 14093,
test("All events via getAuthToken",async({request,authToken})=>{
const response = await request.get(baseUrl+"/events",{
    headers:{   Authorization:`Bearer ${authToken}`}
  
})
  expect( response.status()).toBe(200)
})



test("Get events without authorization", async ({ request }) => {
    const response = await request.get(baseUrl + "/events");

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error).toBe("Unauthorized");
});

test("Get events with valid JWT",async({request})=>{

    const token = await getAuthToken(request,baseUrl)
   
    //check user data
    const responseWithToken=await request.get(baseUrl+"/events",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    const responseBody=await responseWithToken.json()
    expect(responseWithToken.status()).toBe(200)
    expect(Array.isArray(responseBody.data)).toBe(true)

})
test("Check events with param `Conference`",async({request})=>{

    const token = await getAuthToken(request,baseUrl)
    const response = await request.get(baseUrl+"/events",{
        headers:{ Authorization:`Bearer ${token}`},
        params:{
            category:"Conference"
        }
    })
    expect(response.status()).toBe(200)
    const responseBody= await response.json()
    expect(responseBody.data.length).toBeGreaterThan(0)
    responseBody.data.forEach(item=>{expect(item.category).toBe("Conference")})
})
test("Login with invalid password",async({request})=>{
  const response = await request.post(baseUrl+"/auth/login",{data:
       {
        email: process.env.EVENTHUB_EMAIL,
        password: "1234567"
       }
    })
    expect (response.status()).toBe(400)
    const responseJson = await response.json()
    expect(responseJson.success).toBe(false)
    expect(responseJson.error).toBe('Invalid email or password')
    expect(responseJson.details).toEqual([])
})