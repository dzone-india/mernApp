import { CallbackRequestSuccess, CallbackRequestError } from "../redux/actions/CallbackRequestAction";
import * as Snackbar from "../redux/actions/SnackbarActions";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";

export const CallbackRequestService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CALLBACK_REQUEST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CallbackRequestSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(CallbackRequestError(error));
    dispatch(Snackbar.showFailSnackbar(error.response.data.message));
  }
};
