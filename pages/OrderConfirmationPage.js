class OrderConfirmationPage{
    constructor(page){
        this.page=page
        this.orderField=page.locator("label.ng-star-inserted")
        this.successMessage =page.getByRole("heading",{name:" Thankyou for the order. "})
        this.orderHistory=page.locator("label[routerlink='/dashboard/myorders']")
        
    }

    async getOrderId(){
      return  (await this.orderField
        .textContent()).replaceAll("|","").trim()
    }
      async goToOrderHistory(){
        await this.orderHistory.click()
    }
}export{OrderConfirmationPage}