import{test,expect} from "@playwright/test"
import { AutomationTicketsApp } from "../pages/AutomationTicketsApp"
const url ="https://rahulshettyacademy.com/dropdownsPractise/"
test.describe("Passengers",()=>{
    test.beforeEach(async({page})=>{
        await page.goto(url)
    })
test(" user can increase number of passengers",async({page})=>{

     const ticketApp= new AutomationTicketsApp(page)
    await ticketApp.numberOfPassengers.click()
    await ticketApp.setAdultsNumber(3)
     await ticketApp.doneBtn.click()
await expect (ticketApp.numberOfPassengers).toHaveText('3 Adult')
})

test("user can decrease number of passangers",async({page})=>{

 const ticketApp= new AutomationTicketsApp(page)
 await ticketApp.numberOfPassengers.click()
await ticketApp.setAdultsNumber(5)
await expect (ticketApp.numberOfPassengers).toHaveText('5 Adult')
await ticketApp.setAdultsNumber(2)
     await ticketApp.doneBtn.click()
await expect (ticketApp.numberOfPassengers).toHaveText('2 Adult')
})
test("User can decrease number of childs",async({page})=>{

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

    const ticketApp= new AutomationTicketsApp(page)
await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult')
 await ticketApp.numberOfPassengers.click()
 await ticketApp.setChildNumber(4)
 //only 4 might be added
 await expect(ticketApp.increaseChildBtn)
    .toHaveAttribute('disabled', 'disabled');
// check that button - became disabled
await expect(ticketApp.increaseChildBtn)
    .toHaveCSS('pointer-events', 'none');
 await expect(ticketApp.countChild).toHaveText('4')
  await ticketApp.doneBtn.click()
 await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult, 4 Child')
});
test("Changing adults preserves selected children",async({page})=>{

    const ticketApp= new AutomationTicketsApp(page)
await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult')
 await ticketApp.numberOfPassengers.click()
 await ticketApp.setChildNumber(2)
await expect(ticketApp.countChild).toHaveText('2')
 await ticketApp.setAdultsNumber(5)
 await ticketApp.doneBtn.click()
await expect (ticketApp.numberOfPassengers).toHaveText('5 Adult, 2 Child')
})
test(" Passenger counts are preserved after reopening the menu",async({page})=>{
        const ticketApp= new AutomationTicketsApp(page)
await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult')
 await ticketApp.numberOfPassengers.click()
 await expect(ticketApp.menuDropDown).toBeVisible()
 await ticketApp.setAdultsNumber(1)
 await ticketApp.setChildNumber(2)
  await ticketApp.doneBtn.click()
await expect (ticketApp.numberOfPassengers).toHaveText('1 Adult, 2 Child')
 await expect(ticketApp.menuDropDown).toBeHidden()
 // check again if result the same after closing the menu dropdown
  await ticketApp.numberOfPassengers.click()
  await expect(ticketApp.countChild).toHaveText('2')
  await expect(ticketApp.countAdult).toHaveText('1')
})
//calendar appearance
test("Return calendar is enabled for round trip",async({page})=>{
    const ticketApp= new AutomationTicketsApp(page)
  await ticketApp.roundTripBtn.check()
  await expect(ticketApp.roundTripCalendar).toHaveCSS('opacity','1')
  await ticketApp.oneWayBtn.check()
  await expect(ticketApp.roundTripCalendar).toHaveCSS('opacity','0.5')
  await expect(ticketApp.roundTripBtn).not.toBeChecked();
})
// chose currency from dropdown
test("User can choose the currency",async({page})=>{
    const ticketApp= new AutomationTicketsApp(page)
  //  await ticketApp.currency.click()
    await ticketApp.currency.selectOption('USD')
    await expect(ticketApp.currency).toHaveValue('USD');
})
})