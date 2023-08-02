import ACTION_KEYS from "../../constants/action-keys";
import {
  InvestwithusListService,
  InvestwithusAddService,
  InvestwithusStatusUpdateService,
  InvestwithusUpdateService,
  InvestwithusDataService,
  InvestwithusDeleteService,
} from "../../services/InvestwithusService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const InvestwithusListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(InvestwithusListRequest());
    InvestwithusListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const InvestwithusListRequest = () => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const InvestwithusListSuccess = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const InvestwithusListError = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_LIST_ERROR,
    payload: { error: data },
  };
};

export const InvestwithusAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(InvestwithusAddRequest());
    InvestwithusAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const InvestwithusAddRequest = () => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const InvestwithusAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const InvestwithusAddError = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_ADD_ERROR,
    payload: { error: data },
  };
};

export const InvestwithusStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(InvestwithusUpdateStatusRequest());
    InvestwithusStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const InvestwithusUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const InvestwithusUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const InvestwithusUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const InvestwithusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(InvestwithusUpdateRequest());
    InvestwithusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const InvestwithusUpdateRequest = () => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const InvestwithusUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const InvestwithusUpdateError = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const InvestwithusDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(InvestwithusDataRequest());
    InvestwithusDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const InvestwithusDataRequest = () => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const InvestwithusDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const InvestwithusDataError = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_DATA_ERROR,
    payload: { error: data },
  };
};

export const InvestwithusDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(InvestwithusDeleteRequest());
    InvestwithusDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const InvestwithusDeleteRequest = () => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const InvestwithusDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const InvestwithusDeleteError = (data) => {
  return {
    type: ACTION_KEYS.INVESTWITHUS_DELETE_ERROR,
    payload: { error: data },
  };
};
