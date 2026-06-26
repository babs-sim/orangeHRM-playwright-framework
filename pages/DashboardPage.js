import { expect } from '@playwright/test';

export class DashboardPage {

    //locators
    constructor(page) {
        this.page = page;
        this.adminButton = this.page.getByRole('link', { name: 'Admin' });
        this.recruitmentButton = this.page.getByRole('link', { name: 'Recruitment' });
        this.claimButton = this.page.getByRole('link', { name: 'Claim' });
    }


    //reusable methods

    async clickAdminTab() {
        await this.adminButton.click();
    }

    async clickRecruitmentTab() {
        await this.recruitmentButton.click();
    }

    async clickClaimTab() {
        await this.claimButton.click();
    }
}