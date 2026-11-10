class OrderHistory{
    constructor(page){
        this.page=page
        this.orderHeader=page.getByRole("heading",{name:"Your Orders"})
        
    }
    async viewOrder(orderId){
        await this.page.locator("tbody tr")
        .filter({hasText:orderId}).getByRole("button",{name:"View"}).click()
    }
    async deleteOrder(orderId){
             await this.findOrder(orderId).getByRole("button",{name:"Delete"}).click()
    }
     findOrder(orderId){
        return this.page.locator("tbody tr")
        .filter({hasText:orderId})
    }
}
export{OrderHistory}