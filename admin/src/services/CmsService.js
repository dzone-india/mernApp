import * as CmsAction from "../redux/actions/CmsAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const CmsListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsListSuccess(result));
  } catch (error) {
    dispatch(CmsAction.CmsListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const CmsAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/cms");
    window.location.reload();
  } catch (error) {
    dispatch(CmsAction.CmsAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const CmsStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsUpdateStatusSuccess(result));

    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_LIST_ENDPOINT,
      {},
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(CmsAction.CmsUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const CmsUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/cms");
    window.location.reload();
  } catch (error) {
    dispatch(CmsAction.CmsUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const CmsDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_LIST_ENDPOINT,
      {},
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(CmsAction.CmsDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const CmsDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CMS_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(CmsAction.CmsDataSuccess(result));
  } catch (error) {
    dispatch(CmsAction.CmsDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
