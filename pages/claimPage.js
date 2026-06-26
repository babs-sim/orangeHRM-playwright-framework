import { expect } from '@playwright/test';

export class ClaimPage {

    //locators
    constructor(page) {
        this.page = page;
        this.addClaimsButton = this.page.getByRole('button', { name: 'Assign Claim'});
        this.employee = this.page.getByPlaceholder('Type for hints...');
        this.eventDropdown = this.page.locator('//form[@class="oxd-form"]/div[2]/div/div[1]/div/div[2]/div/div/div[2]');
        this.currencyDropdown = this.page.locator('//form[@class="oxd-form"]/div[2]/div/div[2]/div/div[2]/div/div/div[2]');
        this.createButton = this.page.getByRole('button', { name: 'Create'});
        this.remarkBox = this.page.locator('//textarea[@class="oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical"]');
        this.addExpense = this.page.locator('(//button[@type="button"][normalize-space()="Add"])[1]');
        this.expenseTypeDropdown = this.page.locator('//div[@role="document"]/form/div[1]/div/div/div/div[2]/div/div/div[2]')
        this.expenseDate = this.page.getByPlaceholder('yyyy-dd-mm');
        this.expenseAmount = this.page.locator('//div[@role="document"]/form/div[2]/div/div[2]/div/div[2]/input');
        this.expenseNote = this.page.locator('(//textarea[@class="oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical"])[2]');
        this.saveExpenseButton = this.page.locator('//button[@type="submit"]');
        this.totalExpenseAmount = this.page.locator('(//p[@class="oxd-text oxd-text--p"])[1]');
        this.succesfullySaved = this.page.locator('//div[@class="oxd-toast-content oxd-toast-content--success"]');

    }

    //reusable methods

    async clickAssignClaim() {
        await this.addClaimsButton.click();
    }

    async fillClaimRequest(name, user, event, currency, comment) {
        await this.employee.fill(name);
        this.employeeOption = this.page.locator(`//div[@role="option"][normalize-space()= "${user}"]`);
        await this.employeeOption.click();

        await this.eventDropdown.click();
        this.eventOptions = this.page.locator(`//div[@role="option"][normalize-space()="${event}"]`)
        this.eventOptions.click()

        await this.currencyDropdown.click();
        this.currencyOptions = this.page.locator(`//div[@role="option"][normalize-space()="${currency}"]`);
        await this.currencyOptions.click();

        await this.remarkBox.fill(comment)
        await this.createButton.click();
    }

    async clickAddExpense() {
        await this.addExpense.waitFor({ state: 'visible' });
        await this.addExpense.click();
    }

    async fillExpenses(reason, date, amount, notes) {
        await this.expenseTypeDropdown.waitFor({ state: 'visible' });
        await this.expenseTypeDropdown.click();

        this.expenseOptions = this.page.locator(`//div[@role="option"][normalize-space()="${reason}"]`);
        await this.expenseOptions.click();
        await this.expenseDate.fill(date);
        await this.expenseAmount.fill(amount);
        await this.expenseNote.fill(notes);
        await this.saveExpenseButton.click();
    }

    async verifyExpenseAmount(amount) {
        await expect(this.totalExpenseAmount).toContainText(amount);
    }

    async verifySuccessfullySaved() {
        await this.succesfullySaved.waitFor({ state: 'visible'});
    }

}