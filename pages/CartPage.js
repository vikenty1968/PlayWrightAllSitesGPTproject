class CartPage{
    constructor(page){
        this.page=page
        this.productInCart = page.locator(".cartSection h3")
    }
  async proceedToCheckOut(){
    await this.page.getByRole("button",{name:"Checkout"}).click()
}
}
export{CartPage}