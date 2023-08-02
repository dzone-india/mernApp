import ACTION_KEYS from "../../constants/action-keys";
import {
  SliderListService,
  SliderAddService,
  SliderStatusUpdateService,
  SliderUpdateService,
  SliderDataService,
  SliderDeleteService,
} from "../../services/HomeSliderService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const SliderListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SliderListRequest());
    SliderListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SliderListRequest = () => {
  return {
    type: ACTION_KEYS.SLIDER_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SliderListSuccess = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SliderListError = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_LIST_ERROR,
    payload: { error: data },
  };
};

export const SliderAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SliderAddRequest());
    SliderAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SliderAddRequest = () => {
  return {
    type: ACTION_KEYS.SLIDER_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SliderAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SliderAddError = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_ADD_ERROR,
    payload: { error: data },
  };
};

export const SliderStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SliderUpdateStatusRequest());
    SliderStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SliderUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.SLIDER_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SliderUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SliderUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const SliderUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SliderUpdateRequest());
    SliderUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SliderUpdateRequest = () => {
  return {
    type: ACTION_KEYS.SLIDER_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SliderUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SliderUpdateError = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const SliderDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SliderDataRequest());
    SliderDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SliderDataRequest = () => {
  return {
    type: ACTION_KEYS.SLIDER_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SliderDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SliderDataError = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_DATA_ERROR,
    payload: { error: data },
  };
};

export const SliderDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SliderDeleteRequest());
    SliderDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SliderDeleteRequest = () => {
  return {
    type: ACTION_KEYS.SLIDER_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SliderDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SliderDeleteError = (data) => {
  return {
    type: ACTION_KEYS.SLIDER_DELETE_ERROR,
    payload: { error: data },
  };
};
