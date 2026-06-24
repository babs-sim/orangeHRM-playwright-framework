import {expect} from '@playwright/test';

export class AdminPage {

    //locators
    constructor(page) {
        this.page = page;
        this.addButton = this.page.locator('//button[normalize-space()="Add"]');
        this.userRoleDropdown = this.page.locator('//div[@class="oxd-grid-2 orangehrm-full-width-grid"]//div[1]//div[1]//div[2]//div[1]//div[1]//div[1]')
        this.inputEmployeeName = this.page.getByPlaceholder('Type for hints...');
        this.statusDropdown = this.page.locator('//div[@class="oxd-grid-2 orangehrm-full-width-grid"]/div[3]/div/div[2]/div/div/div[2]');
        this.usernameBox = this.page.locator('//div[@class="oxd-form-row"]//div[@class="oxd-grid-2 orangehrm-full-width-grid"]//div[@class="oxd-grid-item oxd-grid-item--gutters"]//div[@class="oxd-input-group oxd-input-field-bottom-space"]//div//input[@class="oxd-input oxd-input--active"]')
        this.passwordBox = this.page.locator('//div[@class="oxd-grid-item oxd-grid-item--gutters user-password-cell"]/div/div[2]/input');
        this.confirmPasswordBox = this.page.locator('//div[@class="oxd-form-row user-password-row"]/div/div[2]/div/div[2]/input');
        this.saveButton = this.page.locator('//button[@type="submit"]');
        this.searchUsername = this.page.locator('//div[@class="oxd-input-group oxd-input-field-bottom-space"]//div//input[@class="oxd-input oxd-input--active"]');
        this.recordsFound = this.page.locator('//div[@class="orangehrm-horizontal-padding orangehrm-vertical-padding"]')
        this.results = this.page.locator('//div[@class="oxd-table-card --mobile"]')

    };

    //reusable methods

    async clickAddNewUserButton() {
        await this.addButton.click()
    };

    async clickUserRoleDropdown() {
        await this.userRoleDropdown.click();
    }

    async chooseUserRole(user) {
        this.userRole = this.page.locator(`//div[@class="oxd-select-option"][normalize-space()= "${user}"]`);
        await this.userRole.click()
    }

    async insertEmployeeName(name) {
        await this.inputEmployeeName.fill(name);

    }

    async chooseEmployeeName(name) {
        this.employeeName = this.page.locator(`//div[@class="oxd-autocomplete-option"][normalize-space()="${name}"]`)
        await this.employeeName.click();
    }

    async clickStatusDropdown() {
        await this.statusDropdown.click();
    }

    async chooseStatus(status) {
        this.status = this.page.locator(`//div[@class="oxd-select-option"][normalize-space()="${status}"]`);
        await this.status.click();
    }

    async insertUsernamePassword(username, password, confirmPassword) {
        await this.usernameBox.fill(username);
        await this.passwordBox.fill(password);
        await this.confirmPasswordBox.fill(confirmPassword);
        await this.saveButton.click();
    }

    async verifyUserAdded(username) {
        this.success = this.page.locator(`//div[contains(text(), "${username}")]`);
        await expect(this.success).toHaveText(username);
    }

    async searchByUsername(username, noRecordsText, numberResults) {
        await this.searchUsername.fill(username);
        await this.saveButton.click();
        await expect(this.recordsFound).toHaveText(noRecordsText)
        await expect(this.results).toHaveCount(numberResults)

    }


}