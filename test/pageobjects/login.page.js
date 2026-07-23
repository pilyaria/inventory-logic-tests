class LoginPage {
  get userNameInput() {
    return $('//input[@id="user-name"]');
  }
  get passwordInput() {
    return $('//input[@id="password"]');
  }
  get loginButton() {
    return $('//input[@id="login-button"]');
  }

  async open() {
    await browser.url("/");
  }

  async login(username, password) {
    await this.userNameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
