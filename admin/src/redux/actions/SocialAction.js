import ACTION_KEYS from "../../constants/action-keys";
import {
  SocialAddService,
  SocialUpdateService,
  SocialDataService,
} from "../../services/SocialService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */

export const SocialAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SocialAddRequest());
    SocialAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SocialAddRequest = () => {
  return {
    type: ACTION_KEYS.SOCIAL_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SocialAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.SOCIAL_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SocialAddError = (data) => {
  return {
    type: ACTION_KEYS.SOCIAL_ADD_ERROR,
    payload: { error: data },
  };
};

export const SocialUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SocialUpdateRequest());
    SocialUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SocialUpdateRequest = () => {
  return {
    type: ACTION_KEYS.SOCIAL_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SocialUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.SOCIAL_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SocialUpdateError = (data) => {
  return {
    type: ACTION_KEYS.SOCIAL_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const SocialDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SocialDataRequest());
    SocialDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SocialDataRequest = () => {
  return {
    type: ACTION_KEYS.SOCIAL_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SocialDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.SOCIAL_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SocialDataError = (data) => {
  return {
    type: ACTION_KEYS.SOCIAL_DATA_ERROR,
    payload: { error: data },
  };
};
