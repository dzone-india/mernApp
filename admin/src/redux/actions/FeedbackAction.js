import ACTION_KEYS from "../../constants/action-keys";
import {
  FeedbackListService,
  FeedbackAddService,
  FeedbackStatusUpdateService,
  FeedbackUpdateService,
  FeedbackDataService,
  FeedbackDeleteService,
} from "../../services/FeedbackService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const FeedbackListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FeedbackListRequest());
    FeedbackListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FeedbackListRequest = () => {
  return {
    type: ACTION_KEYS.FEEDBACK_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FeedbackListSuccess = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FeedbackListError = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_LIST_ERROR,
    payload: { error: data },
  };
};

export const FeedbackAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FeedbackAddRequest());
    FeedbackAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FeedbackAddRequest = () => {
  return {
    type: ACTION_KEYS.FEEDBACK_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FeedbackAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FeedbackAddError = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_ADD_ERROR,
    payload: { error: data },
  };
};

export const FeedbackStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FeedbackUpdateStatusRequest());
    FeedbackStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FeedbackUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.FEEDBACK_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FeedbackUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FeedbackUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const FeedbackUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FeedbackUpdateRequest());
    FeedbackUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FeedbackUpdateRequest = () => {
  return {
    type: ACTION_KEYS.FEEDBACK_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FeedbackUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FeedbackUpdateError = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const FeedbackDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FeedbackDataRequest());
    FeedbackDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FeedbackDataRequest = () => {
  return {
    type: ACTION_KEYS.FEEDBACK_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FeedbackDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FeedbackDataError = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_DATA_ERROR,
    payload: { error: data },
  };
};

export const FeedbackDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FeedbackDeleteRequest());
    FeedbackDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FeedbackDeleteRequest = () => {
  return {
    type: ACTION_KEYS.FEEDBACK_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FeedbackDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FeedbackDeleteError = (data) => {
  return {
    type: ACTION_KEYS.FEEDBACK_DELETE_ERROR,
    payload: { error: data },
  };
};
