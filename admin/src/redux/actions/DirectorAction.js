import ACTION_KEYS from "../../constants/action-keys";
import {
  DirectorListService,
  DirectorAddService,
  DirectorStatusUpdateService,
  DirectorUpdateService,
  DirectorDataService,
  DirectorDeleteService,
} from "../../services/DirectorService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const DirectorListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DirectorListRequest());
    DirectorListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DirectorListRequest = () => {
  return {
    type: ACTION_KEYS.DIRECTOR_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DirectorListSuccess = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DirectorListError = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_LIST_ERROR,
    payload: { error: data },
  };
};

export const DirectorAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DirectorAddRequest());
    DirectorAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DirectorAddRequest = () => {
  return {
    type: ACTION_KEYS.DIRECTOR_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DirectorAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DirectorAddError = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_ADD_ERROR,
    payload: { error: data },
  };
};

export const DirectorStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DirectorUpdateStatusRequest());
    DirectorStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DirectorUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.DIRECTOR_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DirectorUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DirectorUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const DirectorUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DirectorUpdateRequest());
    DirectorUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DirectorUpdateRequest = () => {
  return {
    type: ACTION_KEYS.DIRECTOR_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DirectorUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DirectorUpdateError = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const DirectorDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(DirectorDataRequest());
    DirectorDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DirectorDataRequest = () => {
  return {
    type: ACTION_KEYS.DIRECTOR_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DirectorDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DirectorDataError = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_DATA_ERROR,
    payload: { error: data },
  };
};

export const DirectorDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    DirectorDeleteService(dispatch, data);
    dispatch(Loader.showLoader(""));
    dispatch(DirectorDeleteRequest());
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DirectorDeleteRequest = () => {
  return {
    type: ACTION_KEYS.DIRECTOR_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DirectorDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DirectorDeleteError = (data) => {
  return {
    type: ACTION_KEYS.DIRECTOR_DELETE_ERROR,
    payload: { error: data },
  };
};
