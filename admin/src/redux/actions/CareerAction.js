import ACTION_KEYS from "../../constants/action-keys";
import {
  CareerListService,
  CareerAddService,
  CareerStatusUpdateService,
  CareerUpdateService,
  CareerDataService,
  CareerDeleteService,
  CareerApplicationListService,
  CareerApplicationStatusUpdateService,
} from "../../services/CareerService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const CareerListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerListRequest());
    CareerListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerListRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerListSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerListError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_LIST_ERROR,
    payload: { error: data },
  };
};

export const CareerAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerAddRequest());
    CareerAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerAddRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerAddError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_ADD_ERROR,
    payload: { error: data },
  };
};

export const CareerStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerUpdateStatusRequest());
    CareerStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const CareerUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerUpdateRequest());
    CareerUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerUpdateRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerUpdateError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const CareerDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerDataRequest());
    CareerDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerDataRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerDataError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_DATA_ERROR,
    payload: { error: data },
  };
};

export const CareerDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerDeleteRequest());
    CareerDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerDeleteRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerDeleteError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_DELETE_ERROR,
    payload: { error: data },
  };
};

/**
 * Application part
 * @param {*} data
 * @returns
 */
export const CareerApplicationListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerApplicationListRequest());
    CareerApplicationListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerApplicationListRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_APPLICATION_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerApplicationListSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_APPLICATION_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerApplicationListError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_APPLICATION_LIST_ERROR,
    payload: { error: data },
  };
};

export const CareerApplicationStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(CareerApplicationStatusUpdateStatusRequest());
    CareerApplicationStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const CareerApplicationStatusUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.CAREER_APPLICATION_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const CareerApplicationUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.CAREER_APPLICATION_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const CareerApplicationUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.CAREER_APPLICATION_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};
