class InventoryPage {
  get pageTitle() {
    return $('//span[text()="Products"]');
  }
  get sortingDropdown() {
    return $('//select[@data-test="product-sort-container"]');
  }
  get productCards() {
    return $$('//div[@data-test="inventory-item"]');
  }

  get cartBadge() {
    return $('//span[@data-test="shopping-cart-badge"]');
  }

  getProductCard(productName) {
    return $(
      `//div[@data-test="inventory-item"][.//div[@data-test="inventory-item-name" and normalize-space()="${productName}"]]`,
    );
  }

  getAddButton(productName) {
    return this.getProductCard(productName).$(
      './/button[normalize-space()="Add to cart"]',
    );
  }

  getRemoveButton(productName) {
    return this.getProductCard(productName).$(
      './/button[normalize-space()="Remove"]',
    );
  }

  async addProductToCart(productName) {
    const addButton = this.getAddButton(productName);
    await addButton.waitForClickable();
    await addButton.click();
  }

  async removeProductFromCart(productName) {
    const removeButton = this.getRemoveButton(productName);
    await removeButton.waitForClickable();
    await removeButton.click();
  }

  async addProductsToCart(productNames) {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  async selectSortingByValue(value) {
    await this.sortingDropdown.selectByAttribute("value", value);
  }

  async getPrices() {
    const productCards = await this.productCards;
    const prices = [];

    for (let i = 0; i < productCards.length; i++) {
      const priceElement = productCards[i].$(
        './/div[@data-test="inventory-item-price"]',
      );

      if (!(await priceElement.isExisting())) {
        throw new Error(`Product at position ${i + 1} does not have a price`);
      }

      const priceText = (await priceElement.getText()).trim();

      if (!/^\$\d+(?:\.\d{2})$/.test(priceText)) {
        throw new Error(
          `Product at position ${i + 1} has an invalid price: "${priceText}"`,
        );
      }

      const priceNumber = Number(priceText.slice(1));

      prices.push(priceNumber);
    }
    return prices;
  }
}

export default new InventoryPage();
