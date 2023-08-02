import * as FinanceAction from "../redux/actions/FinanceAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const FinanceListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceListSuccess(result));
  } catch (error) {
    dispatch(FinanceAction.FinanceListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FinanceAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Finance");
    window.location.reload();
  } catch (error) {
    dispatch(FinanceAction.FinanceAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FinanceStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(FinanceAction.FinanceUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FinanceUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Finance");
    window.location.reload();
  } catch (error) {
    dispatch(FinanceAction.FinanceUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FinanceDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(FinanceAction.FinanceDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FinanceDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FINANCE_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FinanceAction.FinanceDataSuccess(result));
  } catch (error) {
    dispatch(FinanceAction.FinanceDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
