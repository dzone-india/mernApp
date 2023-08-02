import ACTION_KEYS from "../../constants/action-keys";
import {
  EnquiryListService,
  EnquiryStatusUpdateService,
} from "../../services/EnquiryService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const EnquiryListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(EnquiryListRequest());
    EnquiryListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const EnquiryListRequest = () => {
  return {
    type: ACTION_KEYS.ENQUIRY_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const EnquiryListSuccess = (data) => {
  return {
    type: ACTION_KEYS.ENQUIRY_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const EnquiryListError = (data) => {
  return {
    type: ACTION_KEYS.ENQUIRY_LIST_ERROR,
    payload: { error: data },
  };
};

export const EnquiryStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(EnquiryUpdateStatusRequest());
    EnquiryStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const EnquiryUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.ENQUIRY_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const EnquiryUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.ENQUIRY_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const EnquiryUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.ENQUIRY_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};
