import ACTION_KEYS from "../../constants/action-keys";
import {
  BlogListService,
  BlogAddService,
  BlogStatusUpdateService,
  BlogUpdateService,
  BlogDataService,
  BlogDeleteService,
} from "../../services/BlogService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const BlogListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BlogListRequest());
    BlogListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BlogListRequest = () => {
  return {
    type: ACTION_KEYS.BLOG_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BlogListSuccess = (data) => {
  return {
    type: ACTION_KEYS.BLOG_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BlogListError = (data) => {
  return {
    type: ACTION_KEYS.BLOG_LIST_ERROR,
    payload: { error: data },
  };
};

export const BlogAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BlogAddRequest());
    BlogAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BlogAddRequest = () => {
  return {
    type: ACTION_KEYS.BLOG_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BlogAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.BLOG_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BlogAddError = (data) => {
  return {
    type: ACTION_KEYS.BLOG_ADD_ERROR,
    payload: { error: data },
  };
};

export const BlogStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BlogUpdateStatusRequest());
    BlogStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BlogUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.BLOG_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BlogUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.BLOG_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BlogUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.BLOG_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const BlogUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BlogUpdateRequest());
    BlogUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BlogUpdateRequest = () => {
  return {
    type: ACTION_KEYS.BLOG_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BlogUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.BLOG_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BlogUpdateError = (data) => {
  return {
    type: ACTION_KEYS.BLOG_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const BlogDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BlogDataRequest());
    BlogDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BlogDataRequest = () => {
  return {
    type: ACTION_KEYS.BLOG_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BlogDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.BLOG_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BlogDataError = (data) => {
  return {
    type: ACTION_KEYS.BLOG_DATA_ERROR,
    payload: { error: data },
  };
};

export const BlogDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BlogDeleteRequest());
    BlogDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BlogDeleteRequest = () => {
  return {
    type: ACTION_KEYS.BLOG_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BlogDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.BLOG_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BlogDeleteError = (data) => {
  return {
    type: ACTION_KEYS.BLOG_DELETE_ERROR,
    payload: { error: data },
  };
};
