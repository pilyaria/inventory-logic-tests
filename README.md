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

test/
├── specs/
├── pageobjects/
├── data/
└── utils/

---

## How to Run

Install dependencies

```bash
npm install
```

```bash
npm run wdio
```

---

## Current Status

- Project initialized
- WebdriverIO configured
- Test implementation in progress