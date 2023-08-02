import ACTION_KEYS from "../../constants/action-keys";
import { LoginService } from "../../services/LoginService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const LoginRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(LoginRequest());
    LoginService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const LoginRequest = () => {
  return {
    type: ACTION_KEYS.LOGIN_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const LoginSuccess = (data) => {
  return {
    type: ACTION_KEYS.LOGIN_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const LoginError = (data) => {
  return {
    type: ACTION_KEYS.LOGIN_ERROR,
    payload: { error: data },
  };
};
