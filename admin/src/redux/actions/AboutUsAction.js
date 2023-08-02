import ACTION_KEYS from "../../constants/action-keys";
import {
  AboutUsListService,
  AboutUsUpdateService,
  AboutUsAddService,
  AboutUsDataService,
} from "../../services/AboutUsService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const AboutUsListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(AboutUsListRequest());
    dispatch(Loader.showLoader(""));
    AboutUsListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutUsListRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTUS_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutUsListSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutUsListError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_LIST_ERROR,
    payload: { error: data },
  };
};

export const AboutUsUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutUsUpdateRequest());
    AboutUsUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutUsUpdateRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTUS_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutUsUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutUsUpdateError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const AboutUsDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(AboutUsDataRequest());
    AboutUsDataService(dispatch, data);
    dispatch(Loader.showLoader(""));
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutUsDataRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTUS_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutUsDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutUsDataError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_DATA_ERROR,
    payload: { error: data },
  };
};

export const AboutUsAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AboutUsAddRequest());
    AboutUsAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AboutUsAddRequest = () => {
  return {
    type: ACTION_KEYS.ABOUTUS_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AboutUsAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AboutUsAddError = (data) => {
  return {
    type: ACTION_KEYS.ABOUTUS_ADD_ERROR,
    payload: { error: data },
  };
};
