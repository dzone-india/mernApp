import * as AddressAction from "../redux/actions/AddressAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const AddressAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ADDRESS_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AddressAction.AddressAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/address");
    window.location.reload();
  } catch (error) {
    dispatch(AddressAction.AddressAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AddressUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ADDRESS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AddressAction.AddressUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/address");
    window.location.reload();
  } catch (error) {
    dispatch(AddressAction.AddressUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const AddressDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ADDRESS_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(AddressAction.AddressDataSuccess(result));
  } catch (error) {
    dispatch(AddressAction.AddressDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
