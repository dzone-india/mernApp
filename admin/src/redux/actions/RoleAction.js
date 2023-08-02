import ACTION_KEYS from "../../constants/action-keys";
import {
  RoleListService,
  RoleAddService,
  RoleStatusUpdateService,
  RoleUpdateService,
  RoleDataService,
  RoleDeleteService,
  RoleMenuListService,
} from "../../services/RoleService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const RoleListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(RoleListRequest());
    RoleListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const RoleListRequest = () => {
  return {
    type: ACTION_KEYS.ROLE_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const RoleListSuccess = (data) => {
  return {
    type: ACTION_KEYS.ROLE_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const RoleListError = (data) => {
  return {
    type: ACTION_KEYS.ROLE_LIST_ERROR,
    payload: { error: data },
  };
};

export const RoleAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(RoleAddRequest());
    RoleAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const RoleAddRequest = () => {
  return {
    type: ACTION_KEYS.ROLE_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const RoleAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.ROLE_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const RoleAddError = (data) => {
  return {
    type: ACTION_KEYS.ROLE_ADD_ERROR,
    payload: { error: data },
  };
};

export const RoleStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(RoleUpdateStatusRequest());
    RoleStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const RoleUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.ROLE_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const RoleUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.ROLE_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const RoleUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.ROLE_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const RoleUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(RoleUpdateRequest());
    RoleUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const RoleUpdateRequest = () => {
  return {
    type: ACTION_KEYS.ROLE_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const RoleUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.ROLE_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const RoleUpdateError = (data) => {
  return {
    type: ACTION_KEYS.ROLE_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const RoleDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(RoleDataRequest());
    RoleDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const RoleDataRequest = () => {
  return {
    type: ACTION_KEYS.ROLE_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const RoleDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.ROLE_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const RoleDataError = (data) => {
  return {
    type: ACTION_KEYS.ROLE_DATA_ERROR,
    payload: { error: data },
  };
};

export const RoleDeleteRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(RoleDeleteRequest());
    RoleDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const RoleDeleteRequest = () => {
  return {
    type: ACTION_KEYS.ROLE_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const RoleDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.ROLE_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const RoleDeleteError = (data) => {
  return {
    type: ACTION_KEYS.ROLE_DELETE_ERROR,
    payload: { error: data },
  };
};

//menu list
export const RoleMenuListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(RoleMenuListRequest());
    RoleMenuListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const RoleMenuListRequest = () => {
  return {
    type: ACTION_KEYS.ROLE_MENU_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const RoleMenuListSuccess = (data) => {
  return {
    type: ACTION_KEYS.ROLE_MENU_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const RoleMenuListError = (data) => {
  return {
    type: ACTION_KEYS.ROLE_MENU_LIST_ERROR,
    payload: { error: data },
  };
};
