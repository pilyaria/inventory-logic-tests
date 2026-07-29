import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";

describe("UC-1 Inventory Sorting Validation", () => {
  it("should sort products by price from low to high", async () => {
    // The user opens the SauceDemo website
    await LoginPage.open();

    // 1. Login as standard_user
    await LoginPage.login("standard_user", "secret_sauce");

    // Given: the user is logged in
    // The Products page should be opened
    await expect(browser).toHaveUrl(/inventory\.html/);
    await expect(InventoryPage.pageTitle).toBeDisplayed();
    await expect(InventoryPage.pageTitle).toHaveText("Products");

    const productNamesBeforeSorting = await InventoryPage.getProductNames();

    // When: the user selects Price (low to high)
    // 2. Select Price (low to high)
    await InventoryPage.selectSortingByValue("lohi");
    await expect(InventoryPage.sortingDropdown).toHaveValue("lohi");

    // 3. Collect prices from all displayed products
    const actualPrices = await InventoryPage.getPrices();
    const productCards = await InventoryPage.productCards;
    const productNamesAfterSorting = await InventoryPage.getProductNames();

    expect(actualPrices.length).toBeGreaterThan(0);
    expect(actualPrices).toHaveLength(productCards.length);
    expect(actualPrices.every(Number.isFinite)).toBe(true);
    expect([...productNamesAfterSorting].sort()).toEqual(
      [...productNamesBeforeSorting].sort(),
    );

    // Then: the prices are displayed in ascending order
    // 4. Verify ascending sorting
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);
    expect(actualPrices).toEqual(expectedPrices);
  });
});
