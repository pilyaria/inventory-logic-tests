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

The inventory sorting test first collects the product names and prices displayed
before sorting. It then selects the `Price (low to high)` option and verifies
that the dropdown value is changed to `lohi`.

The test then:

1. Processes every displayed product card individually.
2. Verifies that each product card contains a price.
3. Verifies that each price has the expected `$0.00` format.
4. Removes the dollar sign and converts each price to a number.
5. Verifies that the price array is not empty, contains only finite numbers, and
   has the same length as the product list.
6. Collects the product names and prices again after sorting.
7. Compares the product names before and after sorting without considering their
   order.
8. Compares the numeric prices before and after sorting without considering their
   order.
9. Creates a numerically sorted copy of the prices displayed after sorting.
10. Compares the displayed price order with the sorted copy.

The products are considered correctly sorted when the displayed prices match the
numerically sorted copy. The additional comparisons confirm that sorting changes
only the display order: no product or price is added, removed, or changed.
Creating copies prevents the original arrays from being modified during
validation.

### Cart State Logic

The cart test starts by verifying that the cart badge does not exist. It adds
two different products and checks that the badge value matches the number of
added products. It also verifies that the button on every added product card
changes from `Add to cart` to `Remove`.

The test then removes one of those products and verifies that:

1. The removed product displays the `Add to cart` button again.
2. Every product that remains in the cart still displays the `Remove` button.
3. The cart badge is decreased by one.

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
  The `maxInstances` option is set to `2` to limit execution to two concurrent
  browser sessions, reducing system load while preserving parallel test
  execution.

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

Run

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

Allure reporting was added in accordance with the **Allure reporter** lesson
from the training course.

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

## JUnit XML Reports

JUnit XML reporting was added in accordance with the **Reporters overview**
lesson from the training course.

Running the tests creates one XML result file per WebdriverIO worker in
`artifacts/junit-results/`. The file name includes the worker ID, for example:

```text
results-0-0.xml
```

Generated JUnit XML results are excluded from Git.

---

## Current Status

- UC-1 inventory sorting test implemented
- UC-2 cart state test implemented with data-driven test cases
- Page Object Model applied
- Cross-browser execution configured for Microsoft Edge and Firefox
- Separate commands added for running each test scenario
- Allure result collection and HTML report generation configured
- JUnit XML result generation configured
- Custom test logger displays each test name and duration
- Generated test results and reports excluded from Git
