import{test,expect} from "@playwright/test"
const url ="https://rahulshettyacademy.com/AutomationPractice/#top"
test("user can choose country with autocomplete",async ({page})=>{
await page.goto(url)
await page.locator("#autocomplete").fill("ind")
await page.getByText("India",{exact:true}).click()
expect(page.locator("#autocomplete")).toHaveValue("India")


})
test("find the  course price in the table",async ({page})=>{
await page.goto(url)
const courseRow = page.locator("tr")
    .filter({ hasText: "Master Selenium Automation in simple Python Language" });

 await expect (courseRow.locator("td:nth-child(3)")).toHaveText("25")

 //lets make it dynamic
 const headers= await page.locator("tbody tr > th").allTextContents()
 console.log(headers.indexOf("Price"))
 const priceColumn=headers.indexOf("Price")
 expect(priceColumn).toBeGreaterThanOrEqual(0)
 const priceCell = courseRow.locator("td").nth(priceColumn)
 await expect(priceCell).toHaveText("25")
 //Найти все курсы, цена которых больше 25, и вывести их названия.
 const allRows = page.locator("#product>tbody tr").filter({has:page.locator("td")})
  const countRow=await allRows.count()
 for(let i=0;i<countRow;i++){
  const row = allRows.nth(i)
  const priceText = await row.locator("td").nth(priceColumn).textContent()
  const price = Number(priceText)
  if(price>25){
    console.log(await row.locator("td").nth(headers.indexOf("Course")).textContent())
  }
 }
 /// alerts
 const alertBtn= page.getByRole("button",{name:"Alert"})
 // register alert handle
 page.on("dialog",async dialog=>{
    console.log(dialog.message())
    await dialog.accept()
     expect(dialog.message()).toContain("Hello Viktor!")
 })
 const input =page.getByPlaceholder("Enter Your Name")
 await input.click()
 await input.fill("Hello Viktor!")
 await alertBtn.click()

})
test("Play around alerts",async({page})=>{
    await page.goto(url)
    const alertBtn= page.getByRole("button",{name:"Alert"})
 // register alert handle
 page.once("dialog",async dialog=>{
    console.log(dialog.message())
    await dialog.accept()
     expect(dialog.message()).toContain("Hello Viktor!")
 })
 const input =page.getByPlaceholder("Enter Your Name")
 await input.click()
 await input.fill("Hello Viktor!")
 await alertBtn.click()

 //confirm
  const confirmBtn =page.getByRole("button",{name:"Confirm"})   
   // subscribe ob event
  page.once("dialog",async dialog=>{
    console.log(dialog.message())
     expect(dialog.type()).toBe("confirm")
     expect(dialog.message()).toContain("Hello Viktor!")
    await dialog.dismiss()
  }) 
  const input1 =page.getByPlaceholder("Enter Your Name")
 await input1.click()
 await input1.fill("Viktor!")
  await confirmBtn.click()
// // new tab opening

const newTab=page.getByText("Open Tab")
const newPagePromise=page.waitForEvent("popup")
await newTab.click()
const newPage= await newPagePromise
await expect(newPage).toHaveURL("https://www.qaclickacademy.com/")
//new window open
const newWindowfield=page.getByText("Open Window")
const newWinPromise = page.waitForEvent("popup")
await newWindowfield.click()
const newWindow = await newWinPromise
await expect(newWindow).toHaveURL("https://www.qaclickacademy.com/")
await newWindow.close();
expect(page.isClosed()).toBe(false);
await expect(page).toHaveURL(/rahulshettyacademy.com/)//check first page url
})