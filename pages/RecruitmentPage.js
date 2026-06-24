import {expect} from '@playwright/test';

export class RecruitmentPage {

    //locators
    constructor(page) {
        this.page = page;
        this.addCandidateButton = this.page.getByRole('button', { name: 'Add' });
        this.fullNameBox = this.page.locator('//input[@placeholder="First Name"]');
        this.lastNameBox = this.page.locator('//input[@placeholder="Last Name"]');
        this.vacancyDropdown = this.page.locator('//form[@class="oxd-form"]/div[2]/div/div/div/div[2]/div/div/div[2]')
        this.emailBox = this.page.locator('(//input[@placeholder="Type here"])[1]')
        this.contactNumberBox = this.page.locator('(//input[@placeholder="Type here"])[2]')
        this.dateDropdown = this.page.locator('(//div[@class="oxd-grid-item oxd-grid-item--gutters"])[6]/div/div[2]/div/div/i')

    }
}