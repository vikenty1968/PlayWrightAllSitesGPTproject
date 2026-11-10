

import{test as setup,expect} from "../fixtures/BaseTest"

setup("Login success",async ({page,loginPage})=>{
   
       await loginPage.openLoginPage()
if(!process.env.TEST_EMAIL ||!process.env.TEST_PASSWORD ){
    throw new Error("TEST_EMAIL or TEST_PASSWORD is missing")
}
await loginPage.loginUser(process.env.TEST_EMAIL,process.env.TEST_PASSWORD)

await expect(loginPage.signOut).toBeVisible()
 await page.context().storageState({
    path: "playwright/.auth/user.json"
});
})