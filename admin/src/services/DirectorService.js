import * as DirectorAction from "../redux/actions/DirectorAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const DirectorListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorListSuccess(result));
  } catch (error) {
    dispatch(DirectorAction.DirectorListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const DirectorAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Director");
    window.location.reload();
  } catch (error) {
    dispatch(DirectorAction.DirectorAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const DirectorStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(DirectorAction.DirectorUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const DirectorUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Director");
    window.location.reload();
  } catch (error) {
    dispatch(DirectorAction.DirectorUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const DirectorDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(DirectorAction.DirectorDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const DirectorDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DIRECTOR_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(DirectorAction.DirectorDataSuccess(result));
  } catch (error) {
    dispatch(DirectorAction.DirectorDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
