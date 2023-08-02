import ACTION_KEYS from "../../constants/action-keys";
import {
  DashboardService
} from "../../services/DashboardService";
import * as Loader from "./LoaderActions";

export const DashboardRequestAsync = () => {
  return (dispatch) => {
    // dispatch(Loader.showLoader(""));
    // dispatch(DashboardListRequest());
    DashboardService(dispatch);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const DashboardListRequest = () => {
  return {
    type: ACTION_KEYS.DASHBOARD_ITEM_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const DashboardListSuccess = (data) => {
  return {
    type: ACTION_KEYS.DASHBOARD_ITEM_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const DashboardListError = (data) => {
  return {
    type: ACTION_KEYS.DASHBOARD_ITEM_LIST_ERROR,
    payload: { error: data },
  };
};

