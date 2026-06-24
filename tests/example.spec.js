// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import {DashboardPage} from "../pages/DashboardPage";
import {AdminPage} from "../pages/AdminPage";

let loginPage;
let dashboardPage;
let adminPage;

test('Correct title appears', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('OrangeHRM');
});

test('User logs in successfully', async ({page}) => {

  await page.goto('/');
  await expect(page).toHaveTitle('OrangeHRM');
  loginPage = new LoginPage(page);

  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});


test('User cannot log in without credentials', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('OrangeHRM');

  loginPage = new LoginPage(page);
  await loginPage.login('', '');
  await loginPage.verifyRequiredTextAppears();
});

test('User cannot log in with invalid credentials', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('OrangeHRM');

  loginPage = new LoginPage(page);
  await loginPage.login('Ad', '123');
  await loginPage.verifyErrorMessage('Invalid credentials');
});

test('User can add a new user in admin tab', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('OrangeHRM');

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  adminPage = new AdminPage(page);

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  await adminPage.clickAddNewUserButton();
  await adminPage.clickUserRoleDropdown();
  await adminPage.chooseUserRole("Admin");
  await adminPage.insertEmployeeName("test name");
  await adminPage.chooseEmployeeName("test name user");
  await adminPage.clickStatusDropdown();
  await adminPage.chooseStatus("Enabled");
  await adminPage.insertUsernamePassword("testingusername1234","ABCd1234567!", "ABCd1234567!");
  await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
  await adminPage.verifyUserAdded("testingusername1234");
})

test('verify new user added', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('OrangeHRM');

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  adminPage = new AdminPage(page);

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await adminPage.verifyUserAdded("testingusername1234");
})

test.only('Admin is able to search up users by username', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('OrangeHRM');

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  adminPage = new AdminPage(page);

  await loginPage.login('Admin', 'admin123', 1);
  await dashboardPage.clickAdminTab();
  await adminPage.searchByUsername("testingusername1234", "(1) Record Found");
})

