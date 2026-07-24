# Inventory Logic Tests

## Project Overview

This project contains automated UI tests for the SauceDemo application.

The project is implemented using WebdriverIO and JavaScript as part of the EPAM JavaScript Test Automation course.

The goal is to validate inventory sorting, shopping cart behavior, and demonstrate clean automation practices.

---

## Task Description

Application:
https://www.saucedemo.com

Automation framework:

- WebdriverIO
- Mocha
- JavaScript

Required design pattern:

- Page Object Model (POM)

---

## Test Scenarios

### UC-1 Inventory Sorting Validation

Steps:

1. Login as `standard_user`
2. Select **Price (low to high)** from the sorting dropdown.
3. Collect prices from all displayed products.
4. Verify that prices are sorted in ascending order.

Expected Result:

- Products are displayed in ascending order by price.

---

### UC-2 Cart State Logic

Steps:

1. Login as `standard_user`
2. Add two different products to the shopping cart.
3. Verify the cart badge displays **2**.
4. Remove one product.
5. Verify the cart badge updates to **1**.

Expected Result:

- Cart state is updated correctly after removing an item.

---

## Implementation Details

### Sorting Validation Logic

The inventory sorting test selects the `Price (low to high)` option and verifies
that the dropdown value is changed to `lohi`.

The test then:

1. Collects the text from every displayed product price.
2. Removes the dollar sign from each price.
3. Converts each price from a string to a number.
4. Verifies that the resulting array is not empty and contains only valid
   numbers.
5. Creates a sorted copy of the collected array using numeric ascending order.
6. Compares the original array with the sorted copy.

The products are considered correctly sorted when both arrays are equal.
Creating a copy prevents the original array from being changed during
validation.

### Cart State Logic

The cart test starts by verifying that the cart badge does not exist. It adds
two different products and checks that the badge value matches the number of
added products. The test then removes one of those products, verifies that its
`Add to cart` button is displayed again, and checks that the badge value is
decreased by one.

Product names and the product to remove are stored separately in
`test/data/cart-items.data.js`. The test iterates over the exported test cases,
which provides data-driven parametrization without hard-coding product names in
the test logic.

### Test Design

- **Page Object Model:** page selectors and user actions are located in the
  page object files, while validations remain in the spec files.
- **BDD structure:** the scenarios use the Mocha BDD interface and
  Given-When-Then comments to show the test flow.
- **XPath locators:** products are selected by their visible names, and the
  `Add to cart` and `Remove` buttons are located inside the matching product
  card.
- **Assertions:** the tests validate successful login, page state, the selected
  sorting option, collected price data, sorting order, cart badge values, and
  the state of the removed product.
- **Parallel cross-browser execution:** WebdriverIO capabilities include
  Microsoft Edge and Firefox. Both browsers execute the spec files in parallel.

---

## Tech Stack

- JavaScript
- Node.js
- WebdriverIO
- Mocha
- Git

---

## Project Structure

```text
inventory-logic-tests/
|-- reporters/
|   `-- custom-reporter.js
|-- test/
|   |-- data/
|   |   `-- cart-items.data.js
|   |-- pageobjects/
|   |   |-- inventory.page.js
|   |   `-- login.page.js
|   `-- specs/
|       |-- cart-state.spec.js
|       `-- inventory-sorting.spec.js
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- README.md
`-- wdio.conf.js
```

---

## How to Run

Install dependencies

```bash
npm install
```

```bash
npm run wdio
```

Run only the inventory sorting test:

```bash
npm run test:sorting
```

Run only the cart state test:

```bash
npm run test:cart
```

## Allure Reports

Allure reports were added in accordance with the completed course material.

Running the tests creates Allure results in `allure-results/`.

Generate the HTML report:

```bash
npm run allure:generate
```

Open the generated report:

```bash
npm run allure:open
```

Alternatively, generate and open a temporary report in one command:

```bash
npm run allure:serve
```

Allure requires Java to be installed. Generated results and reports are excluded
from Git.

---

## Current Status

- UC-1 inventory sorting test implemented
- UC-2 cart state test implemented with data-driven test cases
- Page Object Model applied
- Cross-browser execution configured for Microsoft Edge and Firefox
- Separate commands added for running each test scenario
- Allure result collection and HTML report generation configured
- Custom test logger displays each test name and duration
- Generated test results and reports excluded from Git
