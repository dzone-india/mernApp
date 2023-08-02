import * as AboutUsAction from "../redux/actions/AboutUsAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const AboutUsListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTUS_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutUsAction.AboutUsListSuccess(result));
  } catch (error) {
    dispatch(AboutUsAction.AboutUsListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutUsAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTUS_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutUsAction.AboutUsAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/AboutUs");
    window.location.reload();
  } catch (error) {
    dispatch(AboutUsAction.AboutUsAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutUsUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutUsAction.AboutUsUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/AboutUs");
    window.location.reload();
  } catch (error) {
    dispatch(AboutUsAction.AboutUsUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutUsDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTUS_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutUsAction.AboutUsDataSuccess(result));
  } catch (error) {
    dispatch(AboutUsAction.AboutUsDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
