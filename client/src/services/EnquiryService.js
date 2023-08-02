import { EnquirySuccess, EnquiryError } from "../redux/actions/EnquiryAction";
import ApiClient from "../api-client";
import * as Snackbar from "../redux/actions/SnackbarActions";
import API_ENDPOINTS from "../constants/api-endpoints";

export const EnquiryService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.ENQUIRY_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(EnquirySuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(EnquiryError(error));
    dispatch(Snackbar.showFailSnackbar(error.response.data.message));
  }
};
