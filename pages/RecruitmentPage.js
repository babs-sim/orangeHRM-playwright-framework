import {expect} from '@playwright/test';

export class RecruitmentPage {

    //locators
    constructor(page) {
        this.page = page;
        this.addCandidateButton = this.page.getByRole('button', { name: 'Add' });
        this.firstNameBox = this.page.locator('//input[@placeholder="First Name"]');
        this.lastNameBox = this.page.locator('//input[@placeholder="Last Name"]');
        this.vacancyDropdown = this.page.locator('//form[@class="oxd-form"]/div[2]/div/div/div/div[2]/div/div/div[2]')
        this.emailBox = this.page.locator('(//input[@placeholder="Type here"])[1]');
        this.contactNumberBox = this.page.locator('(//input[@placeholder="Type here"])[2]');
        this.dateBox = this.page.getByPlaceholder('yyyy-dd-mm');
        this.consentCheckbox = this.page.locator('//span[@class="oxd-checkbox-input oxd-checkbox-input--focus --label-right oxd-checkbox-input"]');
        this.saveButton = this.page.locator('//button[@type="submit"]');
        this.applicationSentTitle = this.page.locator('//h6[normalize-space()="Application Stage"]')
    }

    //reusable methods

    async clickAddCandidateButton() {
        await this.addCandidateButton.click();
    }

    async addCandidateDetails (firstName, lastName, vacancy, email, number, date) {
        await this.firstNameBox.fill(firstName);
        await this.lastNameBox.fill(lastName);
        await this.vacancyDropdown.click();
        this.vacancyOptions = this.page.locator(`//div[@role="option"][normalize-space()= "${vacancy}"]`);
        await this.vacancyOptions.click();
        await this.emailBox.fill(email);
        await this.contactNumberBox.fill(number);
        await this.dateBox.fill(date);
    }

    async confirmConsentCheckbox() {
        await this.consentCheckbox.click();
    }

    async saveCandidateDetails () {
        await this.saveButton.click();
   }

    async verifyCandidateAdded () {
        await expect(this.applicationSentTitle).toHaveText('Application Stage');
    }
}