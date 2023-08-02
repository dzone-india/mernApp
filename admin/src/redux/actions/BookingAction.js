import ACTION_KEYS from "../../constants/action-keys";
import {
  BookingListService,
  BookingStatusUpdateService,
} from "../../services/BookingService";
import * as Loader from "./LoaderActions";
/**
 * Call by the Component to make Login Request
 * @param {*} data
 * @returns
 */
export const BookingListRequestAsync = (data) => {
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BookingListRequest());
    BookingListService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BookingListRequest = () => {
  return {
    type: ACTION_KEYS.BOOKING_LIST_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BookingListSuccess = (data) => {
  return {
    type: ACTION_KEYS.BOOKING_LIST_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BookingListError = (data) => {
  return {
    type: ACTION_KEYS.BOOKING_LIST_ERROR,
    payload: { error: data },
  };
};

export const BookingStatusUpdateRequestAsync = (data) => {
  // console.log('data',data);
  return (dispatch) => {
    dispatch(Loader.showLoader(""));
    dispatch(BookingUpdateStatusRequest());
    BookingStatusUpdateService(dispatch, data);
  };
};

/**
 * Action Creator to dispatch login action
 * @returns
 */
const BookingUpdateStatusRequest = () => {
  return {
    type: ACTION_KEYS.BOOKING_UPDATE_STATUS_REQUEST,
    payload: null,
  };
};

/**
 * Action Creator to dispatch Success
 * @param {*} data
 * @returns
 */
export const BookingUpdateStatusSuccess = (data) => {
  return {
    type: ACTION_KEYS.BOOKING_UPDATE_STATUS_SUCCESS,
    payload: data,
  };
};

/**
 * Action Creator to dispatch error
 * @param {*} data
 * @returns
 */
export const BookingUpdateStatusError = (data) => {
  return {
    type: ACTION_KEYS.BOOKING_UPDATE_STATUS_ERROR,
    payload: { error: data },
  };
};
