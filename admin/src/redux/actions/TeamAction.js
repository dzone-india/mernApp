import ACTION_KEYS from "../../constants/action-keys";
import {
  TeamListService,
  TeamAddService,
  TeamStatusUpdateService,
  TeamUpdateService,
  TeamDataService,
  TeamDeleteService,
} from "../../services/TeamService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const TeamListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(TeamListRequest());
    TeamListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const TeamListRequest = () => {
  return {
    type: ACTION_KEYS.TEAM_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const TeamListSuccess = (data) => {
  return {
    type: ACTION_KEYS.TEAM_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const TeamListError = (data) => {
  return {
    type: ACTION_KEYS.TEAM_LIST_ERROR,
    payload: { error: data },
  };
};

export const TeamAddRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(TeamAddRequest());
    TeamAddService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const TeamAddRequest = () => {
  return {
    type: ACTION_KEYS.TEAM_ADD_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const TeamAddSuccess = (data) => {
  return {
    type: ACTION_KEYS.TEAM_ADD_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const TeamAddError = (data) => {
  return {
    type: ACTION_KEYS.TEAM_ADD_ERROR,
    payload: { error: data },
  };
};

export const TeamStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(TeamUpdateStatusRequest());
    TeamStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const TeamUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.TEAM_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const TeamUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.TEAM_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const TeamUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.TEAM_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};

export const TeamUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(TeamUpdateRequest());
    TeamUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const TeamUpdateRequest = () => {
  return {
    type: ACTION_KEYS.TEAM_UPDATE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const TeamUpdateSuccess = (data) => {
  return {
    type: ACTION_KEYS.TEAM_UPDATE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const TeamUpdateError = (data) => {
  return {
    type: ACTION_KEYS.TEAM_UPDATE_ERROR,
    payload: { error: data },
  };
};

export const TeamDataRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(TeamDataRequest());
    TeamDataService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const TeamDataRequest = () => {
  return {
    type: ACTION_KEYS.TEAM_DATA_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const TeamDataSuccess = (data) => {
  return {
    type: ACTION_KEYS.TEAM_DATA_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const TeamDataError = (data) => {
  return {
    type: ACTION_KEYS.TEAM_DATA_ERROR,
    payload: { error: data },
  };
};

export const TeamDeleteRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(TeamDeleteRequest());
    TeamDeleteService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const TeamDeleteRequest = () => {
  return {
    type: ACTION_KEYS.TEAM_DELETE_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const TeamDeleteSuccess = (data) => {
  return {
    type: ACTION_KEYS.TEAM_DELETE_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const TeamDeleteError = (data) => {
  return {
    type: ACTION_KEYS.TEAM_DELETE_ERROR,
    payload: { error: data },
  };
};
