import * as TeamAction from "../redux/actions/TeamAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";

export const TeamListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamListSuccess(result));
  } catch (error) {
    dispatch(TeamAction.TeamListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const TeamAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/team");
    window.location.reload();
  } catch (error) {
    dispatch(TeamAction.TeamAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const TeamStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(TeamAction.TeamUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const TeamUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/team");
    window.location.reload();
  } catch (error) {
    dispatch(TeamAction.TeamUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const TeamDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(TeamAction.TeamDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const TeamDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.TEAM_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(TeamAction.TeamDataSuccess(result));
  } catch (error) {
    dispatch(TeamAction.TeamDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
