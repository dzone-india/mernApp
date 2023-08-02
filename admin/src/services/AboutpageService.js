import * as AboutpageAction from "../redux/actions/AboutpageAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const AboutpageListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageListSuccess(result));
  } catch (error) {
    dispatch(AboutpageAction.AboutpageListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutpageAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Aboutpage");
    window.location.reload();
  } catch (error) {
    dispatch(AboutpageAction.AboutpageAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutpageStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageUpdateStatusSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));

    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageListSuccess(result1));
  } catch (error) {
    dispatch(AboutpageAction.AboutpageUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutpageUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Aboutpage");
    window.location.reload();
  } catch (error) {
    dispatch(AboutpageAction.AboutpageUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutpageDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(AboutpageAction.AboutpageDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AboutpageDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ABOUTPAGE_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AboutpageAction.AboutpageDataSuccess(result));
  } catch (error) {
    dispatch(AboutpageAction.AboutpageDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
