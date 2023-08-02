import { ForgotSuccess, ForgotError } from "../redux/actions/ForgotAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import * as Loader from "../redux/actions/LoaderActions";
export const ForgotService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FORGOT_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ForgotSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    let token = result.tempAuthenticationLink.split("=");
    window.location.href = "/setnewpassword?token=" + token[1];
  } catch (error) {
    dispatch(ForgotError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
