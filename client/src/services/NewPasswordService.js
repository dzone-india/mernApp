import { NewPasswordSuccess, NewPasswordError } from "../redux/actions/NewPasswordAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/SnackbarActions";

export const NewPasswordService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.NEW_PASSWORD_ENDPOINT,
      data,
      null,
      null,
      false
    );
    dispatch(NewPasswordSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    window.location.href = "/signin";
  } catch (error) {
    dispatch(NewPasswordError(error));
    dispatch(Snackbar.showFailSnackbar(error.response.data.message));
  }
};


