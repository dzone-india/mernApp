import * as ConstructionAction from "../redux/actions/ConstructionAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";

export const ConstructionListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionListSuccess(result));
  } catch (error) {
    dispatch(ConstructionAction.ConstructionListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ConstructionAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Construction");
    window.location.reload();
  } catch (error) {
    dispatch(ConstructionAction.ConstructionAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ConstructionStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ConstructionAction.ConstructionUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ConstructionUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Construction");
    window.location.reload();
  } catch (error) {
    dispatch(ConstructionAction.ConstructionUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ConstructionDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ConstructionAction.ConstructionDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ConstructionDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CONSTRUCTION_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ConstructionAction.ConstructionDataSuccess(result));
  } catch (error) {
    dispatch(ConstructionAction.ConstructionDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
