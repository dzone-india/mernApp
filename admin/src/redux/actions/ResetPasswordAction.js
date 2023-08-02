import ACTION_KEYS from "../../constants/action-keys";
import { ResetPasswordService } from "../../services/ResetPasswordService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make ResetPassword Request
 * @param {*} data
 * @returns
 */
export const ResetPasswordRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ResetPasswordRequest());
    ResetPasswordService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch ResetPassword action
 * @returns
 */
const ResetPasswordRequest = () => {
  return {
    type: ACTION_KEYS.RESET_PASSWORD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ResetPasswordSuccess = (data) => {
  return {
    type: ACTION_KEYS.RESET_PASSWORD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ResetPasswordError = (data) => {
  return {
    type: ACTION_KEYS.RESET_PASSWORD_ERROR,
    payload: { error: data },
  };
};
