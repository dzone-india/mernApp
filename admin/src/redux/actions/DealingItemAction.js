import ACTION_KEYS from "../../constants/action-keys";
import {
  DealingItemListService,
  DealingItemAddService,
  DealingItemStatusUpdateService,
  DealingItemDeleteService,
  DealingItemDataService,
  DealingItemUpdateService,
} from "../../services/DealingItemService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const DealingItemListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DealingItemListRequest());
    DealingItemListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DealingItemListRequest = () => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DealingItemListSuccess = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DealingItemListError = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_LIST_ERROR,
    payload: { error: data },
  };
};

export const DealingItemAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DealingItemAddRequest());
    DealingItemAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DealingItemAddRequest = () => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DealingItemAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DealingItemAddError = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_ADD_ERROR,
    payload: { error: data },
  };
};

export const DealingItemStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DealingItemUpdateStatusRequest());
    DealingItemStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DealingItemUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DealingItemUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DealingItemUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const DealingItemDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DealingItemDeleteRequest());
    DealingItemDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DealingItemDeleteRequest = () => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DealingItemDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DealingItemDeleteError = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_DELETE_ERROR,
    payload: { error: data },
  };
};

export const DealingItemDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DealingItemDataRequest());
    DealingItemDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DealingItemDataRequest = () => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DealingItemDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DealingItemDataError = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_DATA_ERROR,
    payload: { error: data },
  };
};

export const DealingItemUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DealingItemUpdateRequest());
    DealingItemUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DealingItemUpdateRequest = () => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DealingItemUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DealingItemUpdateError = (data) => {
  return {
    type: ACTION_KEYS.DEALING_ITEM_UPDATE_ERROR,
    payload: { error: data },
  };
};
