# OrangeHRM Playwright Automation Framework

# Overview
This project is a UI Test Automation Framework built using:

- Playwright
- JavaScript
- Page Object Model (POM)
- HTML Reporting

The framework automates test scenarios on: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

---
# Installation

Clone the repository:
```
git clone https://github.com/babs-sim/orangeHRM-playwright-framework.git
```

Install dependencies:
```
npm install
```

Install Playwright browsers:
```
npx playwright install
```
---
# To run

To run all test:
```
npm run test
```
To only run regression tests:
```
npm run test:regression
```
To only run sanity tests:
```
npm run test:sanity
```
To show report:
```
npm run report
```
