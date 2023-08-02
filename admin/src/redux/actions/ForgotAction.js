import ACTION_KEYS from "../../constants/action-keys";
import { ForgotService } from "../../services/ForgotService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Forgot Request
 * @param {*} data
 * @returns
 */
export const ForgotRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ForgotRequest());
    ForgotService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch Forgot action
 * @returns
 */
const ForgotRequest = () => {
  return {
    type: ACTION_KEYS.FORGOT_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ForgotSuccess = (data) => {
  return {
    type: ACTION_KEYS.FORGOT_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ForgotError = (data) => {
  return {
    type: ACTION_KEYS.FORGOT_ERROR,
    payload: { error: data },
  };
};
