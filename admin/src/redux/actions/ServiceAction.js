import ACTION_KEYS from "../../constants/action-keys";
import {
  ServiceListService,
  ServiceAddService,
  ServiceStatusUpdateService,
  ServiceDeleteService,
  ServiceDataService,
  ServiceUpdateService,
} from "../../services/ServiceService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const ServiceListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceListRequest());
    ServiceListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceListRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceListSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceListError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_LIST_ERROR,
    payload: { error: data },
  };
};

export const ServiceAddRequestAsync = (data) => {
  console.log("data", data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceAddRequest());
    ServiceAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceAddRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceAddError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ADD_ERROR,
    payload: { error: data },
  };
};

export const ServiceStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceUpdateStatusRequest());
    ServiceStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const ServiceDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceDeleteRequest());
    ServiceDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceDeleteRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceDeleteError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_DELETE_ERROR,
    payload: { error: data },
  };
};

export const ServiceDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceDataRequest());
    ServiceDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceDataRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceDataError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_DATA_ERROR,
    payload: { error: data },
  };
};

export const ServiceUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceUpdateRequest());
    ServiceUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceUpdateRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceUpdateError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_UPDATE_ERROR,
    payload: { error: data },
  };
};
