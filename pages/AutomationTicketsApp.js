class AutomationTicketsApp {
  constructor(page) {
    this.page = page;
    this.numberOfPassengers = page.locator("#divpaxinfo");
    this.increaseAdNumber = page.locator("#hrefIncAdt");
    this.decreaseAdNumber = page.locator("#hrefDecAdt");
    this.increaseChildBtn = page.locator("#hrefIncChd");
    this.decreaseChildBtn=page.locator("#hrefDecChd")
    this.countAdult = page.locator("#spanAudlt");
    this.countChild = page.locator("#spanChild");
    this.doneBtn = page.getByRole("button", { name: "Done" });
  }
  async increaseAdultsNumber() {
    await this.increaseAdNumber.click();
  }
  async increaseChildNumber() {
    await this.increaseChildBtn.click();
  }

  async setAdultsNumber(count) {
    const initialCount = Number(await this.countAdult.textContent());
    const dif = count - initialCount;
    if (dif > 0) {
      for (let i = 1; i <= dif; i++) {
        await this.increaseAdNumber.click();
      }
    }
    if (dif < 0) {
      for (let i = 1; i <= Math.abs(dif); i++) {
        await this.decreaseAdNumber.click();
      }
    }
  }
   async setChildNumber(count) {
    const initialCount = Number(await this.countChild.textContent());
    const dif = count - initialCount;
    if (dif > 0) {
      for (let i = 1; i <= dif; i++) {
        await this.increaseChildBtn.click();
      }
    }
    if (dif < 0) {
      for (let i = 1; i <= Math.abs(dif); i++) {
        await this.decreaseChildBtn.click();
      }
    }
  }
}
export { AutomationTicketsApp };
