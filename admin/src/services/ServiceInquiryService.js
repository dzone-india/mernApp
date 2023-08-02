import * as ServiceInquiryAction from "../redux/actions/ServiceInquiryAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import * as Loader from "../redux/actions/LoaderActions";

export const ServiceInquiryListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_INQUIRY_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceInquiryAction.ServiceInquiryListSuccess(result));
  } catch (error) {
    dispatch(ServiceInquiryAction.ServiceInquiryListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response?.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceInquiryStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_INQUIRY_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceInquiryAction.ServiceInquiryUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_INQUIRY_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceInquiryAction.ServiceInquiryListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ServiceInquiryAction.ServiceInquiryUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response?.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const ServiceInquiryDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_INQUIRY_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceInquiryAction.ServiceInquiryDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.SERVICE_INQUIRY_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(ServiceInquiryAction.ServiceInquiryListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(ServiceInquiryAction.ServiceInquiryDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response?.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
