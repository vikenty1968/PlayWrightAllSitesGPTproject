
import{test,expect} from "@playwright/test"
import { AutomationTicketsApp } from "../pages/AutomationTicketsApp"
const url ="https://rahulshettyacademy.com/dropdownsPractise/"
test.describe("Trip types ",()=>{
test.beforeEach(async({page})=>{
    await page.goto(url)
})
test.describe("MultiCity ",()=>{
test("User can add/delete multicity options",async({page})=>{
     const ticketApp= new AutomationTicketsApp(page)
await page.locator("#ctl00_mainContent_rbtnl_Trip_2").check()
await page.locator("#MultiCityModelAlert").click()
await page.locator("#btnAddMore1").click()
await ticketApp.addBtn.click()
await expect(ticketApp.addBtn).toBeHidden()
await ticketApp.removeBtn.click()
await ticketApp.removeBtn.click()
await expect(ticketApp.addBtn).toBeHidden()

})

})
 




})