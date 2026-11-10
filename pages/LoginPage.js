
class LoginPage{
    constructor(page){
      this.page=page 
      this.email=page.locator("#userEmail") 
      this.password=page.getByPlaceholder("enter your passsword")
      this.loginBtn=page.getByRole("button",{name:"login"})
      this.emailGroup =page.locator(".form-group").filter({has:this.email})
      this.emailMessage=this.emailGroup.locator(".invalid-feedback")
      this.passwordGroup = page.locator(".form-group").filter({has:page.locator("#userPassword")})
      this.passMessage =this.passwordGroup.locator(".invalid-feedback")
      this.signOut =page.getByRole("button",{name:" Sign Out "})
      this.message = page.locator(".toast-message")
    }
    async loginUser(email,password){
        await this.email.fill(email)
        await this.password.fill(password)
        await this.loginBtn.click()
    }
    async openLoginPage(){
      await this.page.goto("#/auth/login")
    }
}
export{LoginPage}