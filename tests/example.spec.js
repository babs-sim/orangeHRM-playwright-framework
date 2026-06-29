// @ts-check
import { expect } from '@playwright/test';
import { test } from '../fixtures/baseTest';




test('@regression Correct title appears', async ({ page }) => {

  await expect(page).toHaveTitle('OrangeHRM');

});

test('User logs in successfully', {tag: ['@regression', '@sanity']}, async ({page, loginPage}) => {

  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});


test('User cannot log in without credentials', {tag: '@regression'}, async ({page, loginPage}) => {

  await loginPage.login('', '');
  await loginPage.verifyRequiredTextAppears();
});

test('User cannot log in with invalid credentials', {tag: '@regression'}, async ({page, loginPage}) => {

  await loginPage.login('Ad', '123');
  await loginPage.verifyErrorMessage('Invalid credentials');
});

test('User can add a new user in admin tab', {tag: '@regression'}, async ({page, loginPage, dashboardPage, adminPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
  await adminPage.clickAddNewUserButton();
  await adminPage.clickUserRoleDropdown();
  await adminPage.chooseUserRole("Admin");
  await adminPage.insertEmployeeName("James");
  await adminPage.chooseEmployeeName("James Butler");
  await adminPage.clickStatusDropdown();
  await adminPage.chooseStatus("Enabled");
  await adminPage.insertUsernamePassword("testingusername1234","ABCd1234567!", "ABCd1234567!");
  await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
  await adminPage.verifyUserAdded("testingusername1234");
})

test('Admin is able to search up users by username', {tag: '@regression'}, async ({page, loginPage, dashboardPage, adminPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await adminPage.searchByUsername("testingusername1234", "(1) Record Found");
})

test('Recruitment is able to add candidate details', {tag: '@regression'}, async ({page, loginPage, dashboardPage, adminPage, recruitmentPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickRecruitmentTab();
  await recruitmentPage.clickAddCandidateButton();
  await recruitmentPage.addCandidateDetails('Jonas', 'Bravo', 'Senior QA Lead', 'jbravo@email.com', '07123456789', '2026-12-02');
  //await recruitmentPage.confirmConsentCheckbox();
  await recruitmentPage.saveCandidateDetails();
  await expect(page).toHaveURL(/addCandidate/);
  await recruitmentPage.verifyCandidateAdded()
})

test('Verify user sees correct total amount when making a claim', {tag: '@regression'}, async ({page, loginPage, dashboardPage, claimPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickClaimTab();
  await claimPage.clickAssignClaim();
  await claimPage.fillClaimRequest('Peter', 'Peter Mac Anderson', 'Accommodation', 'Pound Sterling', 'Booked a taxi and hotel');
  await expect(page).toHaveURL(/id/);
  await claimPage.clickAddExpense()
  await claimPage.fillExpenses('Fuel Allowance', '2026-19-03', '15.00', 'Hotel and taxi');
  await claimPage.verifySuccessfullySaved();
  //await page.waitForURL(/assignClaim/);
  //await claimPage.verifyExpenseAmount('15.00');


})

