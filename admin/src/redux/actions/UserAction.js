import ACTION_KEYS from "../../constants/action-keys";
import {
  RoleListService,
  UserListService,
  UserAddService,
  UserStatusUpdateService,
  UserUpdateService,
  UserDataService,
  UserDeleteService,
} from "../../services/UserService";
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
    type: ACTION_KEYS.USER_ROLE_LIST_REQUEST,
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
    type: ACTION_KEYS.USER_ROLE_LIST_SUCCESS,
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
    type: ACTION_KEYS.USER_ROLE_LIST_ERROR,
    payload: { error: data },
  };
};

export const UserListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(UserListRequest());
    UserListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const UserListRequest = () => {
  return {
    type: ACTION_KEYS.USER_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const UserListSuccess = (data) => {
  return {
    type: ACTION_KEYS.USER_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const UserListError = (data) => {
  return {
    type: ACTION_KEYS.USER_LIST_ERROR,
    payload: { error: data },
  };
};

export const UserAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(UserAddRequest());
    UserAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const UserAddRequest = () => {
  return {
    type: ACTION_KEYS.USER_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const UserAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.USER_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const UserAddError = (data) => {
  return {
    type: ACTION_KEYS.USER_ADD_ERROR,
    payload: { error: data },
  };
};

export const UserStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(UserUpdateStatusRequest());
    UserStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const UserUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.USER_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const UserUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.USER_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const UserUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.USER_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const UserUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(UserUpdateRequest());
    UserUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const UserUpdateRequest = () => {
  return {
    type: ACTION_KEYS.USER_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const UserUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.USER_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const UserUpdateError = (data) => {
  return {
    type: ACTION_KEYS.USER_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const UserDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(UserDataRequest());
    UserDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const UserDataRequest = () => {
  return {
    type: ACTION_KEYS.USER_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const UserDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.USER_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const UserDataError = (data) => {
  return {
    type: ACTION_KEYS.USER_DATA_ERROR,
    payload: { error: data },
  };
};

export const UserDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(UserDeleteRequest());
    UserDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const UserDeleteRequest = () => {
  return {
    type: ACTION_KEYS.USER_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const UserDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.USER_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const UserDeleteError = (data) => {
  return {
    type: ACTION_KEYS.USER_DATA_ERROR,
    payload: { error: data },
  };
};
