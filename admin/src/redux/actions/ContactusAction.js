import ACTION_KEYS from "../../constants/action-keys";
import {
  ContactUsListService,
  ContactUsStatusUpdateService,
} from "../../services/ContactUsService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const ContactusListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ContactUsListRequest());
    ContactUsListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ContactUsListRequest = () => {
  return {
    type: ACTION_KEYS.CONTACTUS_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ContactUsListSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONTACTUS_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ContactUsListError = (data) => {
  return {
    type: ACTION_KEYS.CONTACTUS_LIST_ERROR,
    payload: { error: data },
  };
};

export const ContactUsStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ContactUsUpdateStatusRequest());
    ContactUsStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ContactUsUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.CONTACTUS_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ContactUsUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONTACTUS_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ContactUsUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.CONTACTUS_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};
