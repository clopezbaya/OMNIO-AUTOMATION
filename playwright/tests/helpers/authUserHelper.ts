import { Page } from 'playwright/test';
import { ILocShipedgePopUpPage } from '../pages/user/iLocShipedgePopUpPage';
import { LogoutUserPage } from '../pages/user/logoutUserPage';

export async function loginShipedgeIloc(page, username, password) {
  const shipedgePopUp = new ILocShipedgePopUpPage(page);
  await shipedgePopUp.fillUsernameField(username);
  await shipedgePopUp.fillPasswordField(password);
  await shipedgePopUp.clickConnect();
}

export async function logoutUser(page: Page, firstWord: string) {
  const logout = new LogoutUserPage(page, firstWord);
  await logout.logOut();
}
