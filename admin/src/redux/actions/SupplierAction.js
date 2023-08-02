import ACTION_KEYS from "../../constants/action-keys";
import {
  SupplierListService,
  SupplierAddService,
  SupplierStatusUpdateService,
  SupplierUpdateService,
  SupplierDataService,
  SupplierDeleteService,
} from "../../services/SupplierService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const SupplierListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SupplierListRequest());
    SupplierListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SupplierListRequest = () => {
  return {
    type: ACTION_KEYS.SUPPLIER_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SupplierListSuccess = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SupplierListError = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_LIST_ERROR,
    payload: { error: data },
  };
};

export const SupplierAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SupplierAddRequest());
    SupplierAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SupplierAddRequest = () => {
  return {
    type: ACTION_KEYS.SUPPLIER_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SupplierAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SupplierAddError = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_ADD_ERROR,
    payload: { error: data },
  };
};

export const SupplierStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SupplierUpdateStatusRequest());
    SupplierStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SupplierUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.SUPPLIER_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SupplierUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SupplierUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const SupplierUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SupplierUpdateRequest());
    SupplierUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SupplierUpdateRequest = () => {
  return {
    type: ACTION_KEYS.SUPPLIER_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SupplierUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SupplierUpdateError = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const SupplierDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SupplierDataRequest());
    SupplierDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SupplierDataRequest = () => {
  return {
    type: ACTION_KEYS.SUPPLIER_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SupplierDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SupplierDataError = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_DATA_ERROR,
    payload: { error: data },
  };
};

export const SupplierDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SupplierDeleteRequest());
    SupplierDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const SupplierDeleteRequest = () => {
  return {
    type: ACTION_KEYS.SUPPLIER_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SupplierDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SupplierDeleteError = (data) => {
  return {
    type: ACTION_KEYS.SUPPLIER_DELETE_ERROR,
    payload: { error: data },
  };
};
