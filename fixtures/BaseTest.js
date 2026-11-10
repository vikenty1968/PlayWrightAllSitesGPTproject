
import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { DashBoardPage } from "../pages/DashBoardPage.js";
import { CartPage } from "../pages/CartPage.js";
import { CheckOutPage } from "../pages/CheckOutPage.js";
import { OrderHistory } from "../pages/OrderHistory.js";
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage.js";
import { OrderSummaryPage } from "../pages/OrderSummaryPage.js";
const test= base.extend({
    loginPage:async({page},use)=>{
        const loginPage=new LoginPage(page)
        await use(loginPage)
       
    },
    dashBoardPage:async({page},use)=>{
        const dashBoardPage= new DashBoardPage(page)
        await use(dashBoardPage)
    },
    cartPage:async({page},use)=>{
        const cartPage= new CartPage(page)
        await use(cartPage)
    },
    checkOutPage:async({page},use)=>{
        const checkOutPage= new CheckOutPage(page)
        await use(checkOutPage)
    },
    orderHistory:async({page},use)=>{
        const orderHistory= new OrderHistory(page)
        await use(orderHistory)
    },
    orderConfirmationPage:async({page},use)=>{
        const orderConfirmationPage=new OrderConfirmationPage(page)
        await use(orderConfirmationPage)
    },
    orderSummaryPage:async ({page},use)=>{
        const orderSummaryPage =new OrderSummaryPage(page)
        await use(orderSummaryPage)
    }

})
export { test,expect };

