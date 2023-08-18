import {
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  LOGIN,
  LOGIN_SUCCESS,
} from "../constants";

export const login = ({ usr, pwd }) => ({
  type: LOGIN,
  payload: { usr, pwd },
});

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });

export const changeUsername = (usr) => ({
  type: CHANGE_USERNAME,
  payload: { usr },
});

export const changePassword = (pwd) => ({
  type: CHANGE_PASSWORD,
  payload: { pwd },
});
