import { LoginSuccess, LoginError } from "../redux/actions/LoginAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import * as Loader from "../redux/actions/LoaderActions";
export const LoginService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.LOGIN_ENDPOINT,
      data,
      null,
      null,
      true
    );
    window.localStorage.setItem("user", JSON.stringify(result.user));
    dispatch(LoginSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    window.location.href = "/home";
  } catch (error) {
    dispatch(LoginError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
