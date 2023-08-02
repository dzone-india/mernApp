import * as FeedbackAction from "../redux/actions/FeedbackAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const FeedbackListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackListSuccess(result));
  } catch (error) {
    dispatch(FeedbackAction.FeedbackListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FeedbackAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Feedback");
    window.location.reload();
  } catch (error) {
    dispatch(FeedbackAction.FeedbackAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FeedbackStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_LIST_ENDPOINT,
      "{}",
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(FeedbackAction.FeedbackUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FeedbackUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Feedback");
    window.location.reload();
  } catch (error) {
    dispatch(FeedbackAction.FeedbackUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FeedbackDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_LIST_ENDPOINT,
      "{}",
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(FeedbackAction.FeedbackDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const FeedbackDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.FEEDBACK_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(FeedbackAction.FeedbackDataSuccess(result));
  } catch (error) {
    dispatch(FeedbackAction.FeedbackDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
