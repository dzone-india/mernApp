import ACTION_KEYS from "../../constants/action-keys";
import {
  AddressAddService,
  AddressUpdateService,
  AddressDataService,
} from "../../services/AddressService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */

export const AddressAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(AddressAddRequest());
    dispatch(Loader.showLoader(""));
    AddressAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AddressAddRequest = () => {
  return {
    type: ACTION_KEYS.ADDRESS_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AddressAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.ADDRESS_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AddressAddError = (data) => {
  return {
    type: ACTION_KEYS.ADDRESS_ADD_ERROR,
    payload: { error: data },
  };
};

export const AddressUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(AddressUpdateRequest());
    dispatch(Loader.showLoader(""));
    AddressUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AddressUpdateRequest = () => {
  return {
    type: ACTION_KEYS.ADDRESS_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AddressUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.ADDRESS_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AddressUpdateError = (data) => {
  return {
    type: ACTION_KEYS.ADDRESS_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const AddressDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(AddressDataRequest());
    AddressDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const AddressDataRequest = () => {
  return {
    type: ACTION_KEYS.ADDRESS_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const AddressDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.ADDRESS_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const AddressDataError = (data) => {
  return {
    type: ACTION_KEYS.ADDRESS_DATA_ERROR,
    payload: { error: data },
  };
};
