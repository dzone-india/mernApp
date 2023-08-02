import { SupplierSuccess, SupplierError } from "../redux/actions/SupplierFormActions";
import ApiClient from "../api-client";
import * as Snackbar from "../redux/actions/SnackbarActions";
import API_ENDPOINTS from "../constants/api-endpoints";

export const SupplierService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.CREATE_SUPPLIER,
      data,
      null,
      null,
      true
    );
    dispatch(SupplierSuccess(result));
    dispatch(Snackbar.showSuccessSnackbar(result.message));
  } catch (error) {
    dispatch(SupplierError(error));
    dispatch(Snackbar.showFailSnackbar(error.response.data.message));
  }
};
