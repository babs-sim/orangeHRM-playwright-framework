// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import {DashboardPage} from "../pages/DashboardPage";
import {AdminPage} from "../pages/AdminPage";
import {RecruitmentPage} from "../pages/RecruitmentPage";

let loginPage;
let dashboardPage;
let adminPage;
let recruitmentPage;

test.beforeEach(async ({page}) => {

  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  adminPage = new AdminPage(page);
  recruitmentPage = new RecruitmentPage(page);

  await page.goto('/');
});

test.afterEach(async ({page}) => {
  await page.waitForTimeout(2000);

  console.log(`Finished ${test.info().title} with status ${test.info().status}`);

  if (test.info().status !== test.info().expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
})




test('Correct title appears', async ({ page }) => {

  await expect(page).toHaveTitle('OrangeHRM');

});

test('User logs in successfully', async ({page}) => {

  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});


test('User cannot log in without credentials', async ({page}) => {

  await loginPage.login('', '');
  await loginPage.verifyRequiredTextAppears();
});

test('User cannot log in with invalid credentials', async ({page}) => {

  await loginPage.login('Ad', '123');
  await loginPage.verifyErrorMessage('Invalid credentials');
});

test('User can add a new user in admin tab', async ({page}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  await adminPage.clickAddNewUserButton();
  await adminPage.clickUserRoleDropdown();
  await adminPage.chooseUserRole("Admin");
  await adminPage.insertEmployeeName("James But");
  await adminPage.chooseEmployeeName("James Butler");
  await adminPage.clickStatusDropdown();
  await adminPage.chooseStatus("Enabled");
  await adminPage.insertUsernamePassword("testingusername1234","ABCd1234567!", "ABCd1234567!");
  await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
  await adminPage.verifyUserAdded("testingusername1234");
})

test('verify new user added', async ({page}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await adminPage.verifyUserAdded("testingusername1234");
})

test('Admin is able to search up users by username', async ({page}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await adminPage.searchByUsername("testingusername1234", "(1) Record Found");
})

test.only('Recruitment is able to add candidate details', async ({page}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickRecruitmentTab();
  await recruitmentPage.clickAddCandidateButton();
  await recruitmentPage.addCandidateDetails('Joe', 'Davis', 'Senior QA Lead', 'joedavis@email.com', '07123456789', '2026-05-02');
  //await recruitmentPage.confirmConsentCheckbox();
  await recruitmentPage.saveCandidateDetails();
  await recruitmentPage.verifyCandidateAdded()
})

