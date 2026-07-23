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
├── test/
│   ├── data/
│   │   └── cart-items.data.js
│   ├── pageobjects/
│   │   ├── inventory.page.js
│   │   └── login.page.js
│   └── specs/
│       ├── cart-state.spec.js
│       └── inventory-sorting.spec.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── wdio.conf.js
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
- Generated test results and reports excluded from Git
