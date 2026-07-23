describe("SauceDemo smoke test", () => {
  it("should open the login page", async () => {
    // Given
    await browser.url("/");
    // Then
    const userNameInput = $('//input[@id="user-name"]');
    const passwordInput = $('//input[@id="password"]');
    const loginButton = $('//input[@id="login-button"]');

    await expect(userNameInput).toBeDisplayed();
    await expect(passwordInput).toBeDisplayed();
    await expect(loginButton).toBeDisplayed();

    await expect(browser).toHaveTitle("Swag Labs");
  });
});