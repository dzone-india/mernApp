import * as DashboardAction from "../redux/actions/DashboardAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Snackbar from "../redux/actions/snackbarActions";
import * as Loader from "../redux/actions/LoaderActions";
export const DashboardService = async (dispatch) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.DASHBOARD_DATA_ENDPOINT,
      null,
      null,
      null,
      true
    );
    dispatch(DashboardAction.DashboardListSuccess(result));
  } catch (error) {
    dispatch(DashboardAction.DashboardListError(error));
    // dispatch(
    //   Snackbar.showFailSnackbar(
    //     error.response.data?.error?.error?.details[0]?.message
    //   )
    // );
  }
  dispatch(Loader.hideLoader(""));
};

