import * as RoleAction from "../redux/actions/RoleAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const RoleListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleListSuccess(result));
  } catch (error) {
    dispatch(RoleAction.RoleListError(error));
    dispatch(Snackbar.showFailSnackbar(error.response.data.message));
  }
  dispatch(Loader.hideLoader(""));
};

export const RoleAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/role");
    window.location.reload();
  } catch (error) {
    dispatch(RoleAction.RoleAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const RoleStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(RoleAction.RoleUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const RoleUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/role");
    window.location.reload();
  } catch (error) {
    dispatch(RoleAction.RoleUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const RoleDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(RoleAction.RoleDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const RoleDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ROLE_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleDataSuccess(result));
  } catch (error) {
    dispatch(RoleAction.RoleDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const RoleMenuListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.MENULIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(RoleAction.RoleMenuListSuccess(result));
  } catch (error) {
    dispatch(RoleAction.RoleMenuListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
