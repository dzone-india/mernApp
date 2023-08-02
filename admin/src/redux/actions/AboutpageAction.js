import ACTION_KEYS from "../../constants/action-keys";
import {
  AboutpageListService,
  AboutpageAddService,
  AboutpageStatusUpdateService,
  AboutpageUpdateService,
  AboutpageDataService,
  AboutpageDeleteService,
} from "../../services/AboutpageService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const AboutpageListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutpageListRequest());
    AboutpageListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutpageListRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutpageListSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutpageListError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_LIST_ERROR,
    payload: { error: data },
  };
};

export const AboutpageAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutpageAddRequest());
    AboutpageAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutpageAddRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutpageAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutpageAddError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_ADD_ERROR,
    payload: { error: data },
  };
};

export const AboutpageStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutpageUpdateStatusRequest());
    AboutpageStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutpageUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutpageUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutpageUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const AboutpageUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutpageUpdateRequest());
    AboutpageUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutpageUpdateRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutpageUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutpageUpdateError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const AboutpageDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutpageDataRequest());
    AboutpageDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutpageDataRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutpageDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutpageDataError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_DATA_ERROR,
    payload: { error: data },
  };
};

export const AboutpageDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutpageDeleteRequest());
    AboutpageDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutpageDeleteRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutpageDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutpageDeleteError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTPAGE_DELETE_ERROR,
    payload: { error: data },
  };
};
