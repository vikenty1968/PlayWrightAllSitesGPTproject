import { test, expect } from "../fixtures/BaseTest.js";

test("Verify add-to-cart API response", async ({
    page,
    dashBoardPage
}) => {
    await page.goto("./");
    
    // Здесь будем ожидать POST /api/ecom/user/add-to-cart without AWAIT !
    const responsePromise=page.waitForResponse(response=>
        response.url().includes("/api/ecom/user/add-to-cart") &&
        response.request().method()==="POST"
    )

    await dashBoardPage.addProductToCart("iphone 13 pro");
   const response =await responsePromise
    // Здесь проверим HTTP 200
    expect(response.status()).toBe(200)
});
test.fixme("UI handles add-to-cart server error", async ({
    page,
    dashBoardPage,cartPage
}) => {
    await page.goto("./");

    // 1. Зарегистрировать page.route()
  await page.route("**/api/ecom/user/add-to-cart",async route=>{
        await route.fulfill({
        status: 500,
        contentType: "application/json",
        json: {
          message: "Internal Server Error"
        }
    });
  })
    // 2. Попробовать добавить iphone 13 pro
await dashBoardPage.addProductToCart("iphone 13 pro");


    // 3. Проверить реакцию интерфейса
    console.log(
    "Alerts:",
    await page.getByRole("alert").allTextContents()
);
// await expect(page.locator("ngx-spinner")).toBeHidden({
//     timeout: 10000
// });
await expect(
    page.locator(".ngx-spinner-overlay")
).toBeHidden({ timeout: 10000 });
await expect(page.getByRole("alert"))
    .toContainText("Internal Server Error");
    // check that cart is empty
//    await dashBoardPage.goToCart()
//     await expect(
//     cartPage.productInCart.filter({ hasText: "iphone 13 pro" })
// ).toHaveCount(0);

});
test("UI displays Service Unavailable error when add-to-cart API returns 503",async({page,dashBoardPage})=>{
    await page.goto("./")
    await page.route("**/api/ecom/user/add-to-cart",async route=>{
        console.log("MOCK INTERCEPTED:", route.request().url());
    await route.fulfill({status:503,
        contentType:"application/json",
        json:{
            message: "Service Unavailable"
        }
    })
})
    await dashBoardPage.addProductToCart("ADIDAS ORIGINAL")
await expect( page.getByRole("alert")).toContainText("Service Unavailable")
   console.log(
    "Alerts:",
    await page.getByRole("alert").allTextContents()
);
})

test("UI handles empty product catalog",async({page,dashBoardPage})=>{
     await page.route("**/api/ecom/product/get-all-products",async route=>{
         console.log("MOCK INTERCEPTED:", route.request().url());
        await route.fulfill({
            status:200,
            json:{
                data:[]
            }
       })     
     })
      await page.goto("./")    
      await expect(dashBoardPage.products).toHaveCount(0)  
})

test("UI displays product with zero price",async ({page,dashBoardPage})=>{
    await page.route("**/api/ecom/product/get-all-products",async route=>{
        const response=await route.fetch()
        const body= await response.json()
       // console.log(body.data[0])
        const product = body.data.find(item=>item.productName==="ADIDAS ORIGINAL")
        if (!product) {
        throw new Error("ADIDAS ORIGINAL not found in API response");
    }
         product.productPrice=-1
         await route.fulfill({
            response,
            json:body
         })
    })
    const responsePromise = page.waitForResponse(res=>res.url().includes("/api/ecom/product/get-all-products"))
    await page.goto("./")
    const response = await responsePromise
    expect (response.status()).toBe(200)
const productText= dashBoardPage.productData.filter({has:page.getByRole('heading',{name:"ADIDAS ORIGINAL",exact:true})})
await expect(productText.locator(".text-muted")).toHaveText("$ -1")
})