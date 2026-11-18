import{test,expect} from "@playwright/test"
import { AutomationTicketsApp } from "../pages/AutomationTicketsApp"
const url ="https://rahulshettyacademy.com/dropdownsPractise/"
test(" user can increase number of passengers",async({page})=>{
    await page.goto(url)
     const ticketApp= new AutomationTicketsApp(page)
    await ticketApp.numberOfPassengers.click()
    // await ticketApp.increaseAdultsNumber()
    // await ticketApp.increaseAdultsNumber()
    await ticketApp.setAdultsNumber(3)
     await ticketApp.doneBtn.click()
await expect (ticketApp.numberOfPassengers).toHaveText('3 Adult')
})

test("user can decrease number of passangers",async({page})=>{
 await page.goto(url)
 const ticketApp= new AutomationTicketsApp(page)
 await ticketApp.numberOfPassengers.click()
await ticketApp.setAdultsNumber(5)
await expect (ticketApp.numberOfPassengers).toHaveText('5 Adult')
await ticketApp.setAdultsNumber(2)
     await ticketApp.doneBtn.click()
await expect (ticketApp.numberOfPassengers).toHaveText('2 Adult')
})
test("User can decrease number of childs",async({page})=>{
    await page.goto(url)
    const ticketApp= new AutomationTicketsApp(page)
await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult')
 await ticketApp.numberOfPassengers.click()
 await ticketApp.setChildNumber(4)
 await expect(ticketApp.countChild).toHaveText('4')
 await ticketApp.setChildNumber(0)
 await expect(ticketApp.countChild).toHaveText('0')
 await expect(ticketApp.decreaseChildBtn)
    .toHaveAttribute('disabled', 'disabled');
// check that button - became disabled
await expect(ticketApp.decreaseChildBtn)
    .toHaveCSS('pointer-events', 'none')
  await ticketApp.doneBtn.click()
 await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult')
})
test('Children count cannot exceed 4', async ({ page }) => {
        await page.goto(url)
    const ticketApp= new AutomationTicketsApp(page)
await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult')
 await ticketApp.numberOfPassengers.click()
 await ticketApp.setChildNumber(4)
 await expect(ticketApp.increaseChildBtn)
    .toHaveAttribute('disabled', 'disabled');
// check that button - became disabled
await expect(ticketApp.increaseChildBtn)
    .toHaveCSS('pointer-events', 'none');
 await expect(ticketApp.countChild).toHaveText('4')
  await ticketApp.doneBtn.click()
 await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult, 4 Child')
});
test("Changing adults preserves selected children ",async({page})=>{
    await page.goto(url)
    const ticketApp= new AutomationTicketsApp(page)
await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult')
 await ticketApp.numberOfPassengers.click()
 await ticketApp.setChildNumber(2)
// await ticketApp.increaseChildNumber()
// await  ticketApp.increaseChildNumber()
await expect(ticketApp.countChild).toHaveText('2')
 await ticketApp.setAdultsNumber(5)
 await ticketApp.doneBtn.click()
await expect (ticketApp.numberOfPassengers).toHaveText('5 Adult, 2 Child')
})