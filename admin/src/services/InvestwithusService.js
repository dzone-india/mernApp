import * as InvestwithusAction from "../redux/actions/InvestwithusAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const InvestwithusListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusListSuccess(result));
  } catch (error) {
    dispatch(InvestwithusAction.InvestwithusListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const InvestwithusAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/investwithus");
    window.location.reload();
  } catch (error) {
    dispatch(InvestwithusAction.InvestwithusAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const InvestwithusStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(InvestwithusAction.InvestwithusUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const InvestwithusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/investwithus");
    window.location.reload();
  } catch (error) {
    dispatch(InvestwithusAction.InvestwithusUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const InvestwithusDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(InvestwithusAction.InvestwithusDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const InvestwithusDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.INVESTWITHUS_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(InvestwithusAction.InvestwithusDataSuccess(result));
  } catch (error) {
    dispatch(InvestwithusAction.InvestwithusDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
