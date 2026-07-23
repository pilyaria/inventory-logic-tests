import { cartTestCases } from "../../data/cart-items.data.js";
import LoginPage from "../../pageobjects/login.page.js";
import InventoryPage from "../../pageobjects/inventory.page.js";

describe("UC-2 Cart State Logic", () => {
  for (const testData of cartTestCases) {
    it(`should add and remove products for ${testData.name}`, async () => {
      const { productsToAdd, productToRemove } = testData;

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
      //const pageTitle = $('//span[normalize-space()="Products"]');
      await expect(browser).toHaveUrl(/inventory\.html/);
      await expect(InventoryPage.pageTitle).toBeDisplayed();
      await expect(InventoryPage.pageTitle).toHaveText("Products");

      // 2. Add the products provided by the test data.
      //const cartBadge = $('//span[@data-test="shopping-cart-badge"]');
      await expect(InventoryPage.cartBadge).not.toExist();

      await InventoryPage.addProductsToCart(productsToAdd);
      /*
      for (const productName of productsToAdd) {
        const productCard = $(
          `//div[@data-test="inventory-item"][.//div[@data-test="inventory-item-name" and normalize-space()="${productName}"]]`,
        );
        const addButton = productCard.$(
          './/button[normalize-space()="Add to cart"]',
        );

        await expect(productCard).toBeDisplayed();
        await expect(addButton).toBeClickable();
        await addButton.click();
      }
        */

      // 3. Verify that the badge matches the number of added products.
      await expect(InventoryPage.cartBadge).toHaveText(
        String(productsToAdd.length),
      );

      // 4. Remove the product provided by the test data.
      await InventoryPage.removeProductFromCart(productToRemove);
      /*
      const productToRemoveCard = $(
        `//div[@data-test="inventory-item"][.//div[@data-test="inventory-item-name" and normalize-space()="${productToRemove}"]]`,
      );
      const removeButton = productToRemoveCard.$(
        './/button[normalize-space()="Remove"]',
      );

      await expect(removeButton).toBeClickable();
      await removeButton.click();
      */
      await expect(InventoryPage.getAddButton(productToRemove)).toBeDisplayed();
      /*
      const addButton = productToRemoveCard.$(
        './/button[normalize-space()="Add to cart"]',
      );
      */

      // 5. Verify that the badge is decreased by one.
      await expect(InventoryPage.cartBadge).toHaveText(
        String(productsToAdd.length - 1),
      );
    });
  }
});
