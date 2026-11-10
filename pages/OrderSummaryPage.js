class OrderSummaryPage{
    constructor(page){
        this.page=page
     
    }
    getOrderIdOnSummary(orderId){
        return this.page.locator("div.col-text",{hasText:orderId})
    }
    getDeliveryCountry(country){
        const delivery = this.page.locator(".address",{hasText:" Delivery Address "})
        return delivery.getByText(country)
    }
}export{OrderSummaryPage}