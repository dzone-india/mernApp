import ACTION_KEYS from "../../constants/action-keys";
import {
  CmsListService,
  CmsAddService,
  CmsStatusUpdateService,
  CmsUpdateService,
  CmsDataService,
  CmsDeleteService,
} from "../../services/CmsService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const CmsListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CmsListRequest());
    CmsListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CmsListRequest = () => {
  return {
    type: ACTION_KEYS.CMS_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CmsListSuccess = (data) => {
  return {
    type: ACTION_KEYS.CMS_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CmsListError = (data) => {
  return {
    type: ACTION_KEYS.CMS_LIST_ERROR,
    payload: { error: data },
  };
};

export const CmsAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CmsAddRequest());
    CmsAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CmsAddRequest = () => {
  return {
    type: ACTION_KEYS.CMS_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CmsAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.CMS_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CmsAddError = (data) => {
  return {
    type: ACTION_KEYS.CMS_ADD_ERROR,
    payload: { error: data },
  };
};

export const CmsStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CmsUpdateStatusRequest());
    CmsStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CmsUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.CMS_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CmsUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.CMS_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CmsUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.CMS_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const CmsUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CmsUpdateRequest());
    CmsUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CmsUpdateRequest = () => {
  return {
    type: ACTION_KEYS.CMS_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CmsUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.CMS_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CmsUpdateError = (data) => {
  return {
    type: ACTION_KEYS.CMS_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const CmsDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CmsDataRequest());
    CmsDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CmsDataRequest = () => {
  return {
    type: ACTION_KEYS.CMS_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CmsDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.CMS_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CmsDataError = (data) => {
  return {
    type: ACTION_KEYS.CMS_DATA_ERROR,
    payload: { error: data },
  };
};

export const CmsDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CmsDeleteRequest());
    CmsDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CmsDeleteRequest = () => {
  return {
    type: ACTION_KEYS.CMS_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CmsDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.CMS_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CmsDeleteError = (data) => {
  return {
    type: ACTION_KEYS.CMS_DELETE_ERROR,
    payload: { error: data },
  };
};
