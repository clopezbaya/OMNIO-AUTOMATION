import { ILocShipedgePopUpPage } from '../pages/user/iLocShipedgePopUpPage';

export async function loginShipedgeIloc(page, username, password) {
  const shipedgePopUp = new ILocShipedgePopUpPage(page);
  await shipedgePopUp.fillUsernameField(username);
  await shipedgePopUp.fillPasswordField(password);
  await shipedgePopUp.clickConnect();
}
