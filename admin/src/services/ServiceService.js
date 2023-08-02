import * as ServiceAction from "../redux/actions/ServiceAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const ServiceListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceListSuccess(result));
  } catch (error) {
    dispatch(ServiceAction.ServiceListError(error));
    dispatch(Snackbar.showFailSnackbar(error.response?.data?.message));
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/service");
    window.location.reload();
  } catch (error) {
    dispatch(ServiceAction.ServiceAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ServiceAction.ServiceUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ServiceAction.ServiceDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceDataSuccess(result));
  } catch (error) {
    dispatch(ServiceAction.ServiceDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceAction.ServiceUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/service");
    window.location.reload();
  } catch (error) {
    dispatch(ServiceAction.ServiceUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
