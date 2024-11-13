import { Page } from '@playwright/test';
import { LoginPage } from '../pages/admin/loginPage';
import { LogoutAdminPage } from '../pages/admin/logoutAdminPage';
import { LogoutUserPage } from '../pages/user/logoutUserPage';
import { RegisterCompanyPage } from '../pages/admin/registerCompanyPage';
import { NewWarehousePage } from '../pages/admin/newWarehousePage';
import { ConnectDataWarehousePage } from '../pages/admin/connectDataWarehousePage';
import { globals } from '../../globals';

export async function login(page: Page, username: string, password: string) {
  const login = new LoginPage(page);
  await page.goto(globals.LOGIN_URL);
  await login.fillUserEmailField(username);
  await login.fillPasswordField(password);
  await login.clickLogin();
}

export async function logoutAdmin(page: Page) {
  const logout = new LogoutAdminPage(page);
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
  const register = new RegisterCompanyPage(page);
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

export async function registerWarehouse(
  page: Page,
  name: string,
  serverName: string,
  firstAddress: string,
  prefix: string,
  secondAddress: string,
  url: string,
  urlImages: string,
  firstPhone: number,
  secondPhone: number,
  country: string,
  state: string,
  city: string,
  postalCode: number,
  description: string,
  fax: string,
  corporateMail: string
) {
  const registerWarehouse = new NewWarehousePage(page);
  await registerWarehouse.fillName(name);
  await registerWarehouse.fillServerName(serverName);
  await registerWarehouse.fillFirstAddress(firstAddress);
  await registerWarehouse.fillPrefix(prefix);
  await registerWarehouse.fillSecondAddress(secondAddress);
  await registerWarehouse.fillUrl(url);
  await registerWarehouse.fillUrlImage(urlImages);
  await registerWarehouse.fillFirstPhone(firstPhone);
  await registerWarehouse.fillSecondPhone(secondPhone);
  await registerWarehouse.selectCountry(country);
  await registerWarehouse.fillState(state);
  await registerWarehouse.fillCity(city);
  await registerWarehouse.fillPostalCode(postalCode);
  await registerWarehouse.fillDescription(description);
  await registerWarehouse.fillFax(fax);
  await registerWarehouse.fillCorporateEmail(corporateMail);
  await registerWarehouse.clickSave();
}

export async function registerConnectionWarehouse(
  page: Page,
  nameConnection: string,
  typeDatabase: string,
  host: string,
  port: string,
  database: string,
  username: string,
  password: string,
  character: string,
  collation: string,
  timeZone: string
) {
  const connectionWarehouse = new ConnectDataWarehousePage(page);
  await connectionWarehouse.clickClearButton();
  await connectionWarehouse.fillNameConnection(nameConnection);
  await connectionWarehouse.selectTypeDataBase(typeDatabase);
  await connectionWarehouse.fillHost(host);
  await connectionWarehouse.fillPort(port);
  await connectionWarehouse.fillDatabase(database);
  await connectionWarehouse.fillUsername(username);
  await connectionWarehouse.fillPassword(password);
  await connectionWarehouse.selectCharacter(character);
  await connectionWarehouse.selectCollation(collation);
  await connectionWarehouse.selectTimeZone(timeZone);
  await connectionWarehouse.clickCreateButton();
}
