import * as BlogAction from "../redux/actions/BlogAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import history from "../components/history";
import * as Loader from "../redux/actions/LoaderActions";
export const BlogListService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogListSuccess(result));
  } catch (error) {
    dispatch(BlogAction.BlogListError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BlogAddService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_ADD_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogAddSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/blog");
    window.location.reload();
  } catch (error) {
    dispatch(BlogAction.BlogAddError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BlogStatusUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_STATUS_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogUpdateStatusSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(BlogAction.BlogUpdateStatusError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BlogUpdateService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_UPDATE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogUpdateSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
    history.push("/blog");
    window.location.reload();
  } catch (error) {
    dispatch(BlogAction.BlogUpdateError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BlogDeleteService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_DELETE_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogDeleteSuccess(result));
    const result1 = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_LIST_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogListSuccess(result1));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(BlogAction.BlogDeleteError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};

export const BlogDataService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.BLOG_DATA_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(BlogAction.BlogDataSuccess(result));
  } catch (error) {
    dispatch(BlogAction.BlogDataError(error));
    dispatch(
      Snackbar.showFailSnackbar(
        error.response.data?.error?.error?.details[0]?.message
      )
    );
  }
  dispatch(Loader.hideLoader(""));
};
