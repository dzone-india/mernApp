import * as CallbackAction from "../redux/actions/CallbackAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import * as Loader from "../redux/actions/LoaderActions";
export const CallbackListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CALLBACK_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CallbackAction.CallbackListSuccess(result));
  } catch (error) {
    dispatch(CallbackAction.CallbackListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const CallbackStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CALLBACK_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CallbackAction.CallbackUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CALLBACK_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CallbackAction.CallbackListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(CallbackAction.CallbackUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
