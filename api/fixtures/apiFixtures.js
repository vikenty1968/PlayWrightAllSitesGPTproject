import{test as base}from"@playwright/test"
import{getAuthToken}from "../helpers/authHelper.js"
//как предоставить токен тесту?
const baseUrl="https://api.eventhub.rahulshettyacademy.com/api"
const test = base.extend({
    authToken:async({request},use)=>{
         const authToken=await getAuthToken(request,baseUrl)
         await use(authToken)
    }

})
export{test}