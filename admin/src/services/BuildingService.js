import * as BuildingAction from "../redux/actions/BuildingAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const BuildingListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingListSuccess(result));
  } catch (error) {
    dispatch(BuildingAction.BuildingListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BuildingAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Building");
    window.location.reload();
  } catch (error) {
    dispatch(BuildingAction.BuildingAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BuildingStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(BuildingAction.BuildingUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BuildingDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(BuildingAction.BuildingDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BuildingUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/building");
    window.location.reload();
  } catch (error) {
    dispatch(BuildingAction.BuildingUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BuildingDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BUILDING_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BuildingAction.BuildingDataSuccess(result));
  } catch (error) {
    dispatch(BuildingAction.BuildingDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
