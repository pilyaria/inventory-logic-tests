import { cartTestCases } from "../../data/cart-items.data.js";

describe("UC-2 Cart State Logic", () => {
  for (const testData of cartTestCases) {
    it(`should add and remove products for ${testData.name}`, async () => {
      const { productsToAdd, productToRemove } = testData;

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
      const pageTitle = $('//span[normalize-space()="Products"]');

      await expect(browser).toHaveUrl(/inventory\.html/);
      await expect(pageTitle).toBeDisplayed();
      await expect(pageTitle).toHaveText("Products");

      // 2. Add the products provided by the test data.
      const cartBadge = $('//span[@data-test="shopping-cart-badge"]');
      await expect(cartBadge).not.toExist();

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

      // 3. Verify that the badge matches the number of added products.
      await expect(cartBadge).toHaveText(String(productsToAdd.length));

      // 4. Remove the product provided by the test data.
      const productToRemoveCard = $(
        `//div[@data-test="inventory-item"][.//div[@data-test="inventory-item-name" and normalize-space()="${productToRemove}"]]`,
      );
      const removeButton = productToRemoveCard.$(
        './/button[normalize-space()="Remove"]',
      );

      await expect(removeButton).toBeClickable();
      await removeButton.click();

      const addButton = productToRemoveCard.$(
        './/button[normalize-space()="Add to cart"]',
      );
      await expect(addButton).toBeDisplayed();

      // 5. Verify that the badge is decreased by one.
      await expect(cartBadge).toHaveText(String(productsToAdd.length - 1));
    });
  }
});
