import ACTION_KEYS from "../../constants/action-keys";
import {
  CallbackListService,
  CallbackStatusUpdateService,
} from "../../services/CallbackService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const CallbackListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CallbackListRequest());
    CallbackListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CallbackListRequest = () => {
  return {
    type: ACTION_KEYS.CALLBACK_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CallbackListSuccess = (data) => {
  return {
    type: ACTION_KEYS.CALLBACK_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CallbackListError = (data) => {
  return {
    type: ACTION_KEYS.CALLBACK_LIST_ERROR,
    payload: { error: data },
  };
};

export const CallbackStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CallbackUpdateStatusRequest());
    CallbackStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CallbackUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.CALLBACK_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CallbackUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.CALLBACK_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CallbackUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.CALLBACK_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};
