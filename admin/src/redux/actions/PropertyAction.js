import ACTION_KEYS from "../../constants/action-keys";
import {
  PropertyListService,
  PropertyAddService,
  PropertyStatusUpdateService,
  PropertyUpdateService,
  PropertyDataService,
  PropertyDeleteService,
} from "../../services/PropertyService";
import * as Loader from "./LoaderActions";
export const PropertyListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(PropertyListRequest());
    PropertyListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const PropertyListRequest = () => {
  return {
    type: ACTION_KEYS.PROPERTY_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const PropertyListSuccess = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const PropertyListError = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_LIST_ERROR,
    payload: { error: data },
  };
};

export const PropertyAddRequestAsync = (data, image) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(PropertyAddRequest());
    PropertyAddService(dispatch, data, image);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const PropertyAddRequest = () => {
  return {
    type: ACTION_KEYS.PROPERTY_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const PropertyAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const PropertyAddError = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_ADD_ERROR,
    payload: { error: data },
  };
};

export const PropertyStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(PropertyUpdateStatusRequest());
    PropertyStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const PropertyUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.PROPERTY_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const PropertyUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const PropertyUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const PropertyUpdateRequestAsync = (data, image) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(PropertyUpdateRequest());
    PropertyUpdateService(dispatch, data, image);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const PropertyUpdateRequest = () => {
  return {
    type: ACTION_KEYS.PROPERTY_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const PropertyUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const PropertyUpdateError = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const PropertyDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(PropertyDataRequest());
    PropertyDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const PropertyDataRequest = () => {
  return {
    type: ACTION_KEYS.PROPERTY_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const PropertyDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const PropertyDataError = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_DATA_ERROR,
    payload: { error: data },
  };
};

export const PropertyDeleteRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(PropertyDeleteRequest());
    PropertyDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const PropertyDeleteRequest = () => {
  return {
    type: ACTION_KEYS.PROPERTY_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const PropertyDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const PropertyDeleteError = (data) => {
  return {
    type: ACTION_KEYS.PROPERTY_DELETE_ERROR,
    payload: { error: data },
  };
};
