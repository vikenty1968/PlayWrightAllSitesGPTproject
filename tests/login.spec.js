// import { test,expect } from "@playwright/test";
// import { LoginPage } from "../pages/LoginPage";
import { test,expect } from "../fixtures/BaseTest";
test.use({ storageState: { cookies: [], origins: [] } });
test("Login page should display email field @smoke",async({loginPage})=>{
    // const loginPage = new LoginPage(page)
    await loginPage.openLoginPage()
    await expect(loginPage.email).toBeVisible()
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginBtn).toBeVisible();

})
test("Login with invalid password and email",async ({loginPage})=>{
    
    await loginPage.openLoginPage()
    await loginPage.loginUser("QW@mail.ru","123456")
    await expect(loginPage.message).toHaveText("Incorrect email or password.")
})
test("Login with empty fields",async ({loginPage})=>{
      await loginPage.openLoginPage()
    await loginPage.email.click()
    await loginPage.password.click()
    await loginPage.loginBtn.click()
    await expect(loginPage.emailMessage).toHaveText("*Email is required")
     await expect(loginPage.passMessage).toHaveText("*Password is required")

})
test("Login success",async ({loginPage})=>{
       await loginPage.openLoginPage()
if(!process.env.TEST_EMAIL ||!process.env.TEST_PASSWORD ){
    throw new Error("TEST_EMAIL or TEST_PASSWORD is missing")
}
await loginPage.loginUser(process.env.TEST_EMAIL,process.env.TEST_PASSWORD)

await expect(loginPage.signOut).toBeVisible()
 
})
