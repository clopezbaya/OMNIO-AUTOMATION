import { ILocShipedgePopUp } from '../pages/user/iLocShipedgePopUp';

export async function loginShipedgeIloc(page, username, password) {
  const shipedgePopUp = new ILocShipedgePopUp(page);
  await shipedgePopUp.fillUsernameField(username);
  await shipedgePopUp.fillPasswordField(password);
  await shipedgePopUp.clickConnect();
}
