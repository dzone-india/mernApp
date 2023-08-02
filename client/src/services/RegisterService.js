import { RegisterRequest, RegisterSuccess, RegisterError } from "../redux/actions/RegisterAction"
import ApiClient from '../api-client';
import API_ENDPOINTS from '../constants/api-endpoints';
import * as Snackbar from "../redux/actions/SnackbarActions";

export const RegisterService = async (dispatch, data) => {
    try {
        const result = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, API_ENDPOINTS.REGISTER_ENDPOINT, data, null, null, true);
        dispatch(RegisterSuccess(result));
        dispatch(Snackbar.showSuccessSnackbar(result.message));
    } catch (error) {
        dispatch(RegisterError(error));
        dispatch(Snackbar.showFailSnackbar(error.response.data.message));
    }
}