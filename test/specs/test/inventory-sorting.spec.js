describe("SauceDemo smoke test", () => {
  it("should open the login page", async () => {
    // Given
    await browser.url("/");
    // Then
    const userNameInput = $('//input[@id="user-name"]');
    const passwordInput = $('//input[@id="password"]');
    const loginButton = $('//input[@id="login-button"]');

    await expect(userNameInput).toBeDisplayed();
    await expect(passwordInput).toBeDisplayed();
    await expect(loginButton).toBeDisplayed();

    await expect(browser).toHaveTitle("Swag Labs");
  });
});

describe("UC-1 Inventory Sorting Validation", () => {
  it("should sort products by price from low to high", async () => {
    // Given: the user opens the SauceDemo website
    await browser.url("/");

    // 1. Login as standard_user
    const userNameInput = $('//input[@id="user-name"]');
    const passwordInput = $('//input[@id="password"]');
    const loginButton = $('//input[@id="login-button"]');
    await userNameInput.setValue("standard_user");
    await passwordInput.setValue("secret_sauce");
    await loginButton.click();

    // Then: the Products page should be opened
    const pageTitle = $('//span[text()="Products"]');

    await expect(browser).toHaveUrl(/inventory\.html/);
    await expect(pageTitle).toBeDisplayed();
    await expect(pageTitle).toHaveText("Products");

    // 2. Select Price (low to high)
    const sortingDropdown = $('//select[@data-test="product-sort-container"]');
    await sortingDropdown.selectByAttribute("value", "lohi");

    await expect(sortingDropdown).toHaveValue("lohi");

    // 3. Collect prices from all displayed products
    const priceElements = await $$('//div[@data-test="inventory-item-price"]');
    expect(priceElements.length).toBeGreaterThan(0);

    const actualPrices = [];

    for (let i = 0; i < priceElements.length; i++) {
      const priceText = await priceElements[i].getText();
      const priceWithoutDollar = priceText.replace("$", "");
      const priceNumber = Number(priceWithoutDollar);

      actualPrices.push(priceNumber);
    }

    expect(actualPrices.every(Number.isFinite)).toBe(true);

    // 4. Verify ascending sorting
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  });
});
