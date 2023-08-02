import {
  GetModuleRightSuccess,
  GetModuleRightsError,
} from "../redux/actions/ModuleRightsAction";
import ApiClient from "../api-client";
import API_ENDPOINTS from "../constants/api-endpoints";
import * as Loader from "../redux/actions/LoaderActions";
export const ModuleRightsService = async (dispatch, data) => {
  try {
    const result = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      API_ENDPOINTS.MODULERIGHTS_ENDPOINT,
      data,
      null,
      null,
      true
    );
    dispatch(GetModuleRightSuccess(result));
  } catch (error) {
    dispatch(GetModuleRightsError(error));
  }
  dispatch(Loader.hideLoader(""));
};
