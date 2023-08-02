import * as SupplierAction from "../redux/actions/SupplierAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const SupplierListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierListSuccess(result));
  } catch (error) {
    dispatch(SupplierAction.SupplierListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SupplierAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/supplier");
    window.location.reload();
  } catch (error) {
    dispatch(SupplierAction.SupplierAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SupplierStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(SupplierAction.SupplierUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SupplierUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/supplier");
    window.location.reload();
  } catch (error) {
    dispatch(SupplierAction.SupplierUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SupplierDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(SupplierAction.SupplierDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SupplierDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SUPPLIER_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierAction.SupplierDataSuccess(result));
  } catch (error) {
    dispatch(SupplierAction.SupplierDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response?.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
