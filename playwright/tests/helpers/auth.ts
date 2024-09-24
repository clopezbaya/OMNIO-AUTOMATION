import { Page } from '@playwright/test';
import { Login } from '../pages/login';
import { LogoutAdmin } from '../pages/logoutAdmin';
import { LogoutUser } from '../pages/logoutUser';
import { Register } from '../pages/register';

export async function login(page: Page, username: string, password: string) {
  const login = new Login(page);
  await page.goto('/');
  await login.fillUserEmailField(username);
  await login.fillPasswordField(password);
  await login.clickLogin();
}

export async function logoutAdmin(page: Page) {
  const logout = new LogoutAdmin(page);
  await logout.logOut();
}

export async function logoutUser(page: Page, firstWord: string) {
  const logout = new LogoutUser(page, firstWord);
  await logout.logOut();
}

export async function registerCompany(
  page: Page,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  companyName: string,
  contactFullName: string,
  country: string,
  state: string,
  city: string,
  address: string,
  phone: number,
  postalCode: number
) {
  const register = new Register(page);
  await register.fillFirstName(firstName);
  await register.fillLastName(lastName);
  await register.fillEmail(email);
  await register.fillPassword(password);
  await register.fillCompanyName(companyName);
  await register.fillContactFullName(contactFullName);
  await register.selectCountry(country);
  await register.fillStateProvince(state);
  await register.fillCity(city);
  await register.fillAddress(address);
  await register.fillPhone(phone);
  await register.fillPostalCode(postalCode);
  await register.checkTermns();
  await register.clickSignUpConfirmation();
}
