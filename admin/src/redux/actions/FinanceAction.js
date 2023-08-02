import ACTION_KEYS from "../../constants/action-keys";
import {
  FinanceListService,
  FinanceAddService,
  FinanceStatusUpdateService,
  FinanceUpdateService,
  FinanceDataService,
  FinanceDeleteService,
} from "../../services/FinanceService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const FinanceListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FinanceListRequest());
    FinanceListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FinanceListRequest = () => {
  return {
    type: ACTION_KEYS.FINANCE_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FinanceListSuccess = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FinanceListError = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_LIST_ERROR,
    payload: { error: data },
  };
};

export const FinanceAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FinanceAddRequest());
    FinanceAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FinanceAddRequest = () => {
  return {
    type: ACTION_KEYS.FINANCE_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FinanceAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FinanceAddError = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_ADD_ERROR,
    payload: { error: data },
  };
};

export const FinanceStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FinanceUpdateStatusRequest());
    FinanceStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FinanceUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.FINANCE_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FinanceUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FinanceUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const FinanceUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FinanceUpdateRequest());
    FinanceUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FinanceUpdateRequest = () => {
  return {
    type: ACTION_KEYS.FINANCE_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FinanceUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FinanceUpdateError = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const FinanceDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FinanceDataRequest());
    FinanceDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FinanceDataRequest = () => {
  return {
    type: ACTION_KEYS.FINANCE_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FinanceDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FinanceDataError = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_DATA_ERROR,
    payload: { error: data },
  };
};

export const FinanceDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(FinanceDeleteRequest());
    FinanceDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const FinanceDeleteRequest = () => {
  return {
    type: ACTION_KEYS.FINANCE_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const FinanceDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const FinanceDeleteError = (data) => {
  return {
    type: ACTION_KEYS.FINANCE_DELETE_ERROR,
    payload: { error: data },
  };
};
