import { SitevisitSuccess, SitevisitError } from "../redux/actions/SitevisitAction";
import * as Snackbar from "../redux/actions/SnackbarActions";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";

export const SitevisitService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SITEVISIT_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(SitevisitSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(SitevisitError(error));
    dispatch(Snackbar.showFailSnackbar(error.response.data.message));
  }
};
