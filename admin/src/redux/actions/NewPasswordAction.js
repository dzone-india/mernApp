import ACTION_KEYS from "../../constants/action-keys";
import { NewPasswordService } from "../../services/NewPasswordService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make NewPassword Request
 * @param {*} data
 * @returns
 */
export const NewPasswordRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(NewPasswordRequest());
    NewPasswordService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch NewPassword action
 * @returns
 */
const NewPasswordRequest = () => {
  return {
    type: ACTION_KEYS.NEW_PASSWORD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const NewPasswordSuccess = (data) => {
  return {
    type: ACTION_KEYS.NEW_PASSWORD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const NewPasswordError = (data) => {
  return {
    type: ACTION_KEYS.NEW_PASSWORD_ERROR,
    payload: { error: data },
  };
};
