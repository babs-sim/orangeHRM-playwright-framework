// @ts-check
import { expect } from '@playwright/test';
import { test } from '../fixtures/baseTest';




test('Correct title appears', async ({ page }) => {

  await expect(page).toHaveTitle('OrangeHRM');

});

test('User logs in successfully', async ({page, loginPage}) => {

  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});


test('User cannot log in without credentials', async ({page, loginPage}) => {

  await loginPage.login('', '');
  await loginPage.verifyRequiredTextAppears();
});

test('User cannot log in with invalid credentials', async ({page, loginPage}) => {

  await loginPage.login('Ad', '123');
  await loginPage.verifyErrorMessage('Invalid credentials');
});

test('User can add a new user in admin tab', async ({page, loginPage, dashboardPage, adminPage}) => {

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

test('verify new user added', async ({page, loginPage, dashboardPage, adminPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await adminPage.verifyUserAdded("testingusername1234");
})

test('Admin is able to search up users by username', async ({page, loginPage, dashboardPage, adminPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await adminPage.searchByUsername("testingusername1234", "(1) Record Found");
})

test('Recruitment is able to add candidate details', async ({page, loginPage, dashboardPage, adminPage, recruitmentPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickRecruitmentTab();
  await recruitmentPage.clickAddCandidateButton();
  await recruitmentPage.addCandidateDetails('Joe', 'Davis', 'Senior QA Lead', 'joedavis@email.com', '07123456789', '2026-05-02');
  //await recruitmentPage.confirmConsentCheckbox();
  await recruitmentPage.saveCandidateDetails();
  await recruitmentPage.verifyCandidateAdded()
})

