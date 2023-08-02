import ACTION_KEYS from "../../constants/action-keys";
import { SideMenuListService } from "../../services/SideMenuListService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const SideMenuListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(SideMenuListRequest());
    SideMenuListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
export const SideMenuListRequest = () => {
  return {
    type: ACTION_KEYS.SIDE_MENU_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const SideMenuListSuccess = (data) => {
  return {
    type: ACTION_KEYS.SIDE_MENU_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const SideMenuListError = (data) => {
  return {
    type: ACTION_KEYS.SIDE_MENU_LIST_ERROR,
    payload: { error: data },
  };
};
