import ACTION_KEYS from "../../constants/action-keys";
import {
  NewsletterListService,
  NewsletterStatusUpdateService,
  NewsletterDeleteService,
} from "../../services/NewsletterService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const NewsletterListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(NewsletterListRequest());
    NewsletterListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const NewsletterListRequest = () => {
  return {
    type: ACTION_KEYS.NEWSLETTER_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const NewsletterListSuccess = (data) => {
  return {
    type: ACTION_KEYS.NEWSLETTER_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const NewsletterListError = (data) => {
  return {
    type: ACTION_KEYS.NEWSLETTER_LIST_ERROR,
    payload: { error: data },
  };
};

export const NewsletterStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(NewsletterUpdateStatusRequest());
    NewsletterStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const NewsletterUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.NEWSLETTER_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const NewsletterUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.NEWSLETTER_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const NewsletterUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.NEWSLETTER_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const NewsletterDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(NewsletterDeleteRequest());
    NewsletterDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const NewsletterDeleteRequest = () => {
  return {
    type: ACTION_KEYS.NEWSLETTER_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const NewsletterDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.NEWSLETTER_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const NewsletterDeleteError = (data) => {
  return {
    type: ACTION_KEYS.NEWSLETTER_DELETE_ERROR,
    payload: { error: data },
  };
};
