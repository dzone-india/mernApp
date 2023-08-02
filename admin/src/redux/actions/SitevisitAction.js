import ACTION_KEYS from "../../constants/action-keys";
import {
  SitevisitListService,
  SitevisitStatusUpdateService,
} from "../../services/SitevisitService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const SitevisitListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SitevisitListRequest());
    SitevisitListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SitevisitListRequest = () => {
  return {
    type: ACTION_KEYS.SITEVISIT_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SitevisitListSuccess = (data) => {
  return {
    type: ACTION_KEYS.SITEVISIT_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SitevisitListError = (data) => {
  return {
    type: ACTION_KEYS.SITEVISIT_LIST_ERROR,
    payload: { error: data },
  };
};

export const SitevisitStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SitevisitUpdateStatusRequest());
    SitevisitStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SitevisitUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.SITEVISIT_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SitevisitUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.SITEVISIT_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SitevisitUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.SITEVISIT_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};
