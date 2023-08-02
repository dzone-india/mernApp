import ACTION_KEYS from "../../constants/action-keys";
import {
  ConstructionListService,
  ConstructionAddService,
  ConstructionStatusUpdateService,
  ConstructionUpdateService,
  ConstructionDataService,
  ConstructionDeleteService,
} from "../../services/ConstructionService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const ConstructionListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ConstructionListRequest());
    ConstructionListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ConstructionListRequest = () => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ConstructionListSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ConstructionListError = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_LIST_ERROR,
    payload: { error: data },
  };
};

export const ConstructionAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ConstructionAddRequest());
    ConstructionAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ConstructionAddRequest = () => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ConstructionAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ConstructionAddError = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_ADD_ERROR,
    payload: { error: data },
  };
};

export const ConstructionStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ConstructionUpdateStatusRequest());
    ConstructionStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ConstructionUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ConstructionUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ConstructionUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const ConstructionUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ConstructionUpdateRequest());
    ConstructionUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ConstructionUpdateRequest = () => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ConstructionUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ConstructionUpdateError = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const ConstructionDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ConstructionDataRequest());
    ConstructionDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ConstructionDataRequest = () => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ConstructionDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ConstructionDataError = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_DATA_ERROR,
    payload: { error: data },
  };
};

export const ConstructionDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(ConstructionDeleteRequest());
    ConstructionDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const ConstructionDeleteRequest = () => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const ConstructionDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const ConstructionDeleteError = (data) => {
  return {
    type: ACTION_KEYS.CONSTRUCTION_DELETE_ERROR,
    payload: { error: data },
  };
};
