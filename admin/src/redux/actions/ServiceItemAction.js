import ACTION_KEYS from "../../constants/action-keys";
import {
  ServiceItemListService,
  ServiceItemAddService,
  ServiceItemStatusUpdateService,
  ServiceItemDeleteService,
  ServiceItemUpdateService,
  ServiceItemDataService,
} from "../../services/ServiceItemService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const ServiceItemListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceItemListRequest());
    ServiceItemListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceItemListRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceItemListSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceItemListError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_LIST_ERROR,
    payload: { error: data },
  };
};

export const ServiceItemAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceItemAddRequest());
    ServiceItemAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceItemAddRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceItemAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceItemAddError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_ADD_ERROR,
    payload: { error: data },
  };
};

export const ServiceItemStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceItemUpdateStatusRequest());
    ServiceItemStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceItemUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceItemUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceItemUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const ServiceItemDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceItemDeleteRequest());
    ServiceItemDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceItemDeleteRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceItemDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceItemDeleteError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_DELETE_ERROR,
    payload: { error: data },
  };
};

export const ServiceItemDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceItemDataRequest());
    ServiceItemDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceItemDataRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceItemDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceItemDataError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_DATA_ERROR,
    payload: { error: data },
  };
};

export const ServiceItemUpdateRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ServiceItemUpdateRequest());
    ServiceItemUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ServiceItemUpdateRequest = () => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ServiceItemUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ServiceItemUpdateError = (data) => {
  return {
    type: ACTION_KEYS.SERVICE_ITEM_UPDATE_ERROR,
    payload: { error: data },
  };
};
