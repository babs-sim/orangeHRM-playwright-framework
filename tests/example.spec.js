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
  await adminPage.insertEmployeeName("Wesley");
  await adminPage.chooseEmployeeName("Wesley Silva Souza");
  await adminPage.clickStatusDropdown();
  await adminPage.chooseStatus("Disabled");
  await adminPage.insertUsernamePassword("testingusername12345","ABCd1234567!", "ABCd1234567!");
  await page.waitForURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
  await adminPage.verifyUserAdded("testingusername12345");
})

test('Admin is able to search up users by username', {tag: '@regression'}, async ({page, loginPage, dashboardPage, adminPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickAdminTab();
  await page.waitForURL(/viewSystemUsers/);
  await adminPage.searchByUsername("testingusername12345", "(1) Record Found");
})

test('Recruitment is able to add candidate details', {tag: '@regression'}, async ({page, loginPage, dashboardPage, adminPage, recruitmentPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickRecruitmentTab();
  await recruitmentPage.clickAddCandidateButton();
  await recruitmentPage.addCandidateDetails('Jonas', 'Bravo', 'Senior QA Lead', 'jbravo@email.com', '07123456789', '2026-12-02');
  //await recruitmentPage.confirmConsentCheckbox();
  await recruitmentPage.saveCandidateDetails();
  await page.waitForURL(/addCandidate/);
  await recruitmentPage.verifyCandidateAdded()
})

test('Verify user can make a claim for worker', {tag: '@regression'}, async ({page, loginPage, dashboardPage, claimPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickClaimTab();
  await claimPage.clickAssignClaim();
  await claimPage.fillClaimRequest('AutoeRMHx QA UserOKheR', 'AutoeRMHx QA UserOKheR', 'Accommodation', 'Pound Sterling', 'Booked a taxi and hotel');
  await page.waitForURL(/id/);
  await claimPage.clickAddExpense();
  await claimPage.fillExpenses('Fuel Allowance', '2026-19-03', '80.00', 'Hotel and taxi');
  await claimPage.verifySuccessfullySaved();
  await claimPage.submitClaim();
})

test.only('Verify user can make a self-claim', {tag: '@regression'}, async ({page, loginPage, dashboardPage, claimPage}) => {

  await loginPage.login('Admin', 'admin123');
  await dashboardPage.clickClaimTab();
  await claimPage.clickMyClaims();
  await claimPage.createMyClaimRequest('House Rent', 'Pound Sterling', 'N/A');
  await claimPage.verifySuccessfullySaved();
  await claimPage.clickAddExpense();
  await claimPage.fillExpenses('Fuel Allowance', '2026-19-03', '80.00', 'N/A');
  await claimPage.verifySuccessfullySaved();
  //await page.waitForURL(/id/);
  await claimPage.submitClaim();
  await page.waitForURL(/id/);
  await claimPage.verifySuccessfulSubmission();
})

