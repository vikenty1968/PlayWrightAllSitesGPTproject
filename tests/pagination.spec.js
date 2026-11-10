import { test, expect } from "@playwright/test";
const URL = "https://rahulshettyacademy.com/seleniumPractise/#/offers";
const searchProduct = "Brinjal";
test("Find product across paginated pages", async ({ page }) => {
  await page.goto(URL);
  const rows = page.locator("tbody tr");
  //const prodName = rows.filter({hasText:"Rice"})
  const prodName = rows.filter({ hasText: searchProduct });
  let numberProductOnPage = await prodName.count();
  const nextBtn = page.getByRole("button", { name: "Next" });
  while (numberProductOnPage == 0) {
    if (!(await nextBtn.isEnabled())) {
      console.log("Product is not found");
      break;
    }
    // check that table reloaded
   //    const previousRowText = await rows.first().innerText();   
    // await nextBtn.click();
    // await expect(rows.first()).not.toHaveText(previousRowText);
    //anothe way to check usung DOM page number
  const currentPageNumber= page
        .locator("[aria-label='Pagination'] li.active span:nth-child(1)")
const previousPageNumber= await currentPageNumber.innerText()
await nextBtn.click();
await expect(currentPageNumber).not.toHaveText(previousPageNumber);
    numberProductOnPage = await prodName.count();
  }

  expect(numberProductOnPage).toBeGreaterThan(0);
  const price = prodName.locator("td").nth(1)
  console.log(price)
   await expect( price).toHaveText("37")
 
})