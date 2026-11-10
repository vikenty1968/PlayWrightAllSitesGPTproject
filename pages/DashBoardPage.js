class DashBoardPage{
    constructor(page){
        this.page=page
        this.products = page.locator(".card")
        this.productData= page.locator(".card-body")
        this.cartBtn = page.locator("[routerlink*='cart']")
        this.checkOutBtn=page.getByRole("button",{name:"Checkout"})
 
    }

async  addProductToCart(productName) {
 const productText= this.productData.filter({has:this.page.getByRole('heading',{name:productName,exact:true})})
 await productText.getByRole("button",{name:" Add To Cart"}).click()
}
async goToCart(){
    await this.cartBtn.click()
}

}
export{DashBoardPage}