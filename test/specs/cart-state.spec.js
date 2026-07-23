import { cartTestCases } from "../data/cart-items.data.js";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";

describe("UC-2 Cart State Logic", () => {
  for (const testData of cartTestCases) {
    it(`should add and remove products for ${testData.name}`, async () => {
      const { productsToAdd, productToRemove } = testData;

      // The user opens the SauceDemo website
      await LoginPage.open();

      // 1. Login as standard_user
      await LoginPage.login("standard_user", "secret_sauce");

      // The Products page should be opened
      await expect(browser).toHaveUrl(/inventory\.html/);
      await expect(InventoryPage.pageTitle).toBeDisplayed();
      await expect(InventoryPage.pageTitle).toHaveText("Products");

      // 2. Add the products provided by the test data.
      await expect(InventoryPage.cartBadge).not.toExist();
      await InventoryPage.addProductsToCart(productsToAdd);
      
      // 3. Verify that the badge matches the number of added products.
      await expect(InventoryPage.cartBadge).toHaveText(
        String(productsToAdd.length),
      );

      // 4. Remove the product provided by the test data.
      await InventoryPage.removeProductFromCart(productToRemove);
      await expect(InventoryPage.getAddButton(productToRemove)).toBeDisplayed();


      // 5. Verify that the badge is decreased by one.
      await expect(InventoryPage.cartBadge).toHaveText(
        String(productsToAdd.length - 1),
      );
    });
  }
});
