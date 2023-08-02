import * as SocialAction from "../redux/actions/SocialAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const SocialAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SOCIAL_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SocialAction.SocialAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/social");
    window.location.reload();
  } catch (error) {
    dispatch(SocialAction.SocialAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SocialUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SOCIAL_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SocialAction.SocialUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/Social");
    window.location.reload();
  } catch (error) {
    dispatch(SocialAction.SocialUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SocialDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SOCIAL_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SocialAction.SocialDataSuccess(result));
  } catch (error) {
    dispatch(SocialAction.SocialDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
