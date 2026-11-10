import{test,expect} from "../fixtures/BaseTest.js"
import { OrderSummaryPage } from "../pages/OrderSummaryPage.js"

const productName="iphone 13 pro"
const country ="United Kingdom"
test("User can place, review and delete an order",async({page,dashBoardPage,cartPage,checkOutPage,orderHistory})=>{
    await page.goto('./')
await dashBoardPage.addProductToCart(productName)
//assert banner success
 await expect( page.getByRole("alert",{name:"Product Added To Cart"})).toBeVisible()
 await dashBoardPage.goToCart()
 //search in
 const productInCart= cartPage.productInCart.filter({ hasText:productName})
 await expect(productInCart).toHaveText(productName)
 // ptoceed to checkout
 await cartPage.proceedToCheckOut()
 await checkOutPage.selectCountry("United", country )
 await expect (checkOutPage.inputCountry).toHaveValue(country)
 await page.getByText("Place Order ").click()
// assertions on checkout page
 await expect (page.getByRole("heading",{name:" Thankyou for the order. "})).toBeVisible()
 const orderId=(await page.locator("label.ng-star-inserted").textContent()).replaceAll("|","").trim()
 console.log(orderId)
//go to the oreders history
await checkOutPage.goToOrderHistory()
//confirm order presents
await expect(page.getByRole("heading",{name:"Your Orders"})).toBeVisible()
//go to order Card
await orderHistory.viewOrder(orderId)
await expect( page.locator("div.col-text",{hasText:orderId})).toBeVisible()
const delivery = page.locator(".address",{hasText:" Delivery Address "})
await expect(delivery.getByText(" United Kingdom")).toBeVisible()//reg ex /United Kingdom/i i-not Case sensitive
//returns to all orders to delete created order
await page.locator(".btn").filter({hasText:" View Orders "}).click()
await orderHistory.deleteOrder(orderId)
//check banner
 await expect( page.getByRole("alert",{name:"Orders Deleted Successfully"})).toBeVisible()
await expect(orderHistory.findOrder(orderId)).toHaveCount(0)
 
})
test("User1 can place, review and delete an order",async({page,
    dashBoardPage,cartPage,checkOutPage,orderHistory,orderConfirmationPage,orderSummaryPage})=>{
    await page.goto('./')
await dashBoardPage.addProductToCart(productName)
//assert banner success
 await expect( page.getByRole("alert",{name:"Product Added To Cart"})).toBeVisible()
 await dashBoardPage.goToCart()
 //search in
 const productInCart= cartPage.productInCart.filter({ hasText:productName})
 await expect(productInCart).toHaveText(productName)
 // ptoceed to checkout
 await cartPage.proceedToCheckOut()
 await checkOutPage.selectCountry("United", country )
 await expect (checkOutPage.inputCountry).toHaveValue(country)
 let orderId
 try{
 await checkOutPage.createOrder()
// assertions on checkout page
 await expect (orderConfirmationPage.successMessage).toBeVisible()
//orderId=(await page.locator("label.ng-star-inserted").textContent()).replaceAll("|","").trim()
 orderId= await orderConfirmationPage.getOrderId()
 console.log(orderId)
//go to the oreders history
await orderConfirmationPage.goToOrderHistory()
//confirm order presents
await expect(orderHistory.orderHeader).toBeVisible()
await orderHistory.viewOrder(orderId)
await expect(orderSummaryPage.getOrderIdOnSummary(orderId)).toBeVisible()
await expect(orderSummaryPage.getDeliveryCountry("United Kingdom")).toBeVisible()//reg ex /United Kingdom/i i-not Case sensitive
//returns to all orders to delete created order
//here it is redundant because of line page.goto(...)
//await page.locator(".btn").filter({hasText:" View Orders "}).click()
 }
 finally{
    if(orderId){
//go to order Card directly to be independant from created order
await page.goto("./dashboard/myorders")
await orderHistory.deleteOrder(orderId)
//check banner
 await expect( page.getByRole("alert",{name:"Orders Deleted Successfully"})).toBeVisible()
await expect(orderHistory.findOrder(orderId)).toHaveCount(0)
}}})
test("User can filter products on home page",async({page,dashBoardPage})=>{
    await page.goto('./')
    // wait for products appearance
//await expect.poll(()=> dashBoardPage.products.count()).toBeGreaterThan(0) possible option
    await dashBoardPage.products.first().waitFor({state:"visible"})
    const initialCount= await(dashBoardPage.products).count()
    // check electonics box
    // const category= page.locator("div.form-group")
    // .filter({ hasText: "electronics" });
    const categoriesSection = page.locator(".border-bottom")
    .filter({
        has: page.getByRole("heading", {
            name: "Categories",
            exact: true
        })
    });

const electronicsCheckbox = categoriesSection.locator(
    'div.form-group:has(> label:text-is("electronics")) > input[type="checkbox"]'
);
//     const checkbox = page.locator(
//     'div.form-group:has(> label:text-is("electronics")) > input[type="checkbox"]'
// ); 
console.log(await electronicsCheckbox.count())
//code to check parent HTML
// console.log(
//     await electronicsCheckbox.evaluateAll(elements =>
//         elements.map(el => el.parentElement.outerHTML)
//     )
// );
  //  await category.locator('input[type="checkbox"]').check()
  await expect(electronicsCheckbox).toHaveCount(1);
await electronicsCheckbox.check();
await expect(electronicsCheckbox).toBeChecked();
    // quantity didn't change in our case
    await expect(dashBoardPage.products).toHaveCount(initialCount)
})