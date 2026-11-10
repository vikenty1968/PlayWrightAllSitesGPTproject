class CheckOutPage{
    constructor(page){
        this.page= page
        this.inputCountry= page.getByPlaceholder("Select Country")
        this.orderHistory=page.locator("label[routerlink='/dashboard/myorders']")
        this.placeOrder = page.getByText("Place Order ")
    }
     async selectCountry(sec,country) {
        await this.inputCountry.pressSequentially(sec);
        await this.page
        .getByRole("button",{name:country}).click()
    }
    async goToOrderHistory(){
        await this.orderHistory.click()
    }
    async createOrder(){
        await this.page.getByText("Place Order ").click()
    }
}
export{CheckOutPage}