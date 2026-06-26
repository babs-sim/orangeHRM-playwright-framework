import {expect, test as base} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import {DashboardPage} from "../pages/DashboardPage";
import {AdminPage} from "../pages/AdminPage";
import {RecruitmentPage} from "../pages/RecruitmentPage";
import {ClaimPage} from "../pages/claimPage";

export const test = base.extend( {

    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({page}, use) => {
        await use(new DashboardPage(page));
    },

    adminPage: async ({page}, use) => {
        await use(new AdminPage(page));
    },

    recruitmentPage: async ({page}, use) => {
        await use(new RecruitmentPage(page));
    },

    claimPage: async ({page}, use) => {
        await use(new ClaimPage(page));
    }

});

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test.afterEach(async ({page}) => {
    await page.waitForTimeout(2000);

    console.log(`Finished ${test.info().title} with status ${test.info().status}`);

    if (test.info().status !== test.info().expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
})