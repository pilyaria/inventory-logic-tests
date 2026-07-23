import LoginPage from "../../pageobjects/login.page.js";
import InventoryPage from "../../pageobjects/inventory.page.js";

describe("UC-1 Inventory Sorting Validation", () => {
  it("should sort products by price from low to high", async () => {
    // Given: the user opens the SauceDemo website
    //await browser.url("/");
    await LoginPage.open();

    // 1. Login as standard_user
    await LoginPage.login("standard_user", "secret_sauce");
    /*
    const userNameInput = $('//input[@id="user-name"]');
    const passwordInput = $('//input[@id="password"]');
    const loginButton = $('//input[@id="login-button"]');
    await userNameInput.setValue("standard_user");
    await passwordInput.setValue("secret_sauce");
    await loginButton.click();
    */

    // Then: the Products page should be opened
    //const pageTitle = $('//span[text()="Products"]');

    await expect(browser).toHaveUrl(/inventory\.html/);
    await expect(InventoryPage.pageTitle).toBeDisplayed();
    await expect(InventoryPage.pageTitle).toHaveText("Products");

    // 2. Select Price (low to high)
    // sortingDropdown = $('//select[@data-test="product-sort-container"]');
    await InventoryPage.selectSortingByValue("lohi");
    //await sortingDropdown.selectByAttribute("value", "lohi");

    await expect(InventoryPage.sortingDropdown).toHaveValue("lohi");

    // 3. Collect prices from all displayed products
    const actualPrices = await InventoryPage.getPrices();

    /*const priceElements = await $$('//div[@data-test="inventory-item-price"]');
    expect(priceElements.length).toBeGreaterThan(0);

    const actualPrices = [];

    for (let i = 0; i < priceElements.length; i++) {
      const priceText = await priceElements[i].getText();
      const priceWithoutDollar = priceText.replace("$", "");
      const priceNumber = Number(priceWithoutDollar);

      actualPrices.push(priceNumber);
    }
    */
    expect(actualPrices.length).toBeGreaterThan(0);
    expect(actualPrices.every(Number.isFinite)).toBe(true);

    // 4. Verify ascending sorting
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  });
});
