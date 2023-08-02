import ACTION_KEYS from "../../constants/action-keys";
import {
  MenuListService,
  MenuAddService,
  MenuStatusUpdateService,
  MenuUpdateService,
  MenuDataService,
} from "../../services/MenuService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const MenuListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(MenuListRequest());
    MenuListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const MenuListRequest = () => {
  return {
    type: ACTION_KEYS.MENU_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const MenuListSuccess = (data) => {
  return {
    type: ACTION_KEYS.MENU_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const MenuListError = (data) => {
  return {
    type: ACTION_KEYS.MENU_LIST_ERROR,
    payload: { error: data },
  };
};

export const MenuAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(MenuAddRequest());
    MenuAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const MenuAddRequest = () => {
  return {
    type: ACTION_KEYS.MENU_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const MenuAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.MENU_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const MenuAddError = (data) => {
  return {
    type: ACTION_KEYS.MENU_ADD_ERROR,
    payload: { error: data },
  };
};

export const MenuStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(MenuUpdateStatusRequest());
    MenuStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const MenuUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.MENU_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const MenuUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.MENU_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const MenuUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.MENU_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const MenuUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(MenuUpdateRequest());
    MenuUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const MenuUpdateRequest = () => {
  return {
    type: ACTION_KEYS.MENU_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const MenuUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.MENU_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const MenuUpdateError = (data) => {
  return {
    type: ACTION_KEYS.MENU_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const MenuDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(MenuDataRequest());
    MenuDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const MenuDataRequest = () => {
  return {
    type: ACTION_KEYS.MENU_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const MenuDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.MENU_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const MenuDataError = (data) => {
  return {
    type: ACTION_KEYS.MENU_DATA_ERROR,
    payload: { error: data },
  };
};
