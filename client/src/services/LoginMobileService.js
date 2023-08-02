import { LoginSuccess, LoginError } from "../redux/actions/LoginAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/SnackbarActions";

export const LoginMobileService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.LOGIN_MOBILE_ENDPOINT,
      data,
      null,
      null,
      false
    );
    window.localStorage.setItem("user", JSON.stringify(result.user));
    dispatch(LoginSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    if (localStorage.getItem("bookNow") == "true") {
      window.location.href = "/home-detail";
    } else if (localStorage.getItem("postProperty") == "true") {
      window.location.href = '/post-property'
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.log("error", error);
    dispatch(LoginError(error));
    dispatch(Snackbar.showFailSnackbar(error?.response?.data?.message));
  }
};
