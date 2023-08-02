import * as HomeSliderAction from "../redux/actions/HomeSliderAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const SliderListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderListSuccess(result));
  } catch (error) {
    dispatch(HomeSliderAction.SliderListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SliderAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/slider");
    window.location.reload();
  } catch (error) {
    dispatch(HomeSliderAction.SliderAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SliderStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(HomeSliderAction.SliderUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SliderUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/slider");
    window.location.reload();
  } catch (error) {
    dispatch(HomeSliderAction.SliderUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SliderDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(HomeSliderAction.SliderDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const SliderDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SLIDER_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(HomeSliderAction.SliderDataSuccess(result));
  } catch (error) {
    dispatch(HomeSliderAction.SliderDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
