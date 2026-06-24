import {expect} from "@playwright/test";

export class LoginPage {

    //locators
    constructor(page) {
        this.page = page;
        this.usernameInput = this.page.locator('[name="username"]');
        this.passwordInput = this.page.locator('[name="password"]');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.requiredFieldNoUsername = this.page.locator('(//span[@class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"][normalize-space()="Required"])[1]');
        this.requiredFieldNoPassword = this.page.locator('(//span[@class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"][normalize-space()="Required"])[2]');
        this.invalidCreds = this.page.locator('//p[normalize-space()= "Invalid credentials"]');
    }

    //reusable methods

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyRequiredTextAppears() {
        await expect(this.requiredFieldNoUsername).toHaveText('Required');
        await expect(this.requiredFieldNoPassword).toHaveText('Required');
    }

    async verifyErrorMessage(text) {
        await expect(this.invalidCreds).toHaveText(text);
    }

}