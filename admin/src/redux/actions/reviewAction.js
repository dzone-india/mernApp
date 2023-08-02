import ACTION_KEYS from "../../constants/action-keys";
import {
  ReviewListService,
  ReviewStatusUpdateService,
} from "../../services/ReviewService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const ReviewListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ReviewListRequest());
    ReviewListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ReviewListRequest = () => {
  return {
    type: ACTION_KEYS.REVIEW_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ReviewListSuccess = (data) => {
  // dispatch(ReviewListRequestAsync)
  return {
    type: ACTION_KEYS.REVIEW_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ReviewListError = (data) => {
  return {
    type: ACTION_KEYS.REVIEW_LIST_ERROR,
    payload: { error: data },
  };
};

export const ReviewStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ReviewUpdateStatusRequest());
    ReviewStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ReviewUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.REVIEW_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ReviewUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.REVIEW_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ReviewUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.REVIEW_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};
