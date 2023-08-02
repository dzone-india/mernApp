import ACTION_KEYS from "../../constants/action-keys";
import {
  BuildingListService,
  BuildingAddService,
  BuildingStatusUpdateService,
  BuildingDeleteService,
  BuildingUpdateService,
  BuildingDataService,
} from "../../services/BuildingService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const BuildingListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BuildingListRequest());
    BuildingListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BuildingListRequest = () => {
  return {
    type: ACTION_KEYS.BUILDING_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BuildingListSuccess = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BuildingListError = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_LIST_ERROR,
    payload: { error: data },
  };
};

export const BuildingAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BuildingAddRequest());
    BuildingAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BuildingAddRequest = () => {
  return {
    type: ACTION_KEYS.BUILDING_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BuildingAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BuildingAddError = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_ADD_ERROR,
    payload: { error: data },
  };
};

export const BuildingStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BuildingUpdateStatusRequest());
    BuildingStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BuildingUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.BUILDING_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BuildingUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BuildingUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const BuildingDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BuildingDeleteRequest());
    BuildingDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BuildingDeleteRequest = () => {
  return {
    type: ACTION_KEYS.BUILDING_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BuildingDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BuildingDeleteError = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_DELETE_ERROR,
    payload: { error: data },
  };
};

export const BuildingUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BuildingUpdateRequest());
    BuildingUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BuildingUpdateRequest = () => {
  return {
    type: ACTION_KEYS.BUILDING_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BuildingUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BuildingUpdateError = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const BuildingDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BuildingDataRequest());
    BuildingDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BuildingDataRequest = () => {
  return {
    type: ACTION_KEYS.BUILDING_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BuildingDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BuildingDataError = (data) => {
  return {
    type: ACTION_KEYS.BUILDING_DATA_ERROR,
    payload: { error: data },
  };
};
