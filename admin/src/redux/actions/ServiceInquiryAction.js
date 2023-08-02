import ACTION_KEYS from "../../constants/action-keys";
import {
  ServiceInquiryListService,
  ServiceInquiryStatusUpdateService,
  ServiceInquiryDeleteService,
} from "../../services/ServiceInquiryService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const ServiceInquiryListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceInquiryListRequest());
    ServiceInquiryListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceInquiryListRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceInquiryListSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceInquiryListError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_LIST_ERROR,
    payload: { error: data },
  };
};

export const ServiceInquiryStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceInquiryUpdateStatusRequest());
    ServiceInquiryStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceInquiryUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceInquiryUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceInquiryUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const ServiceInquiryDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceInquiryDeleteRequest());
    ServiceInquiryDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceInquiryDeleteRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceInquiryDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceInquiryDeleteError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_INQUIRY_DELETE_ERROR,
    payload: { error: data },
  };
};
