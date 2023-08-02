import * as ServiceItemAction from "../redux/actions/ServiceItemAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const ServiceItemListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemListSuccess(result));
  } catch (error) {
    dispatch(ServiceItemAction.ServiceItemListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceItemAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/serviceItem");
    window.location.reload();
  } catch (error) {
    dispatch(ServiceItemAction.ServiceItemAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error?.response?.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceItemStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ServiceItemAction.ServiceItemUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceItemDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ServiceItemAction.ServiceItemDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceItemDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemDataSuccess(result));
  } catch (error) {
    dispatch(ServiceItemAction.ServiceItemDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceItemUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_ITEM_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceItemAction.ServiceItemUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/serviceItem");
    window.location.reload();
  } catch (error) {
    dispatch(ServiceItemAction.ServiceItemUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
