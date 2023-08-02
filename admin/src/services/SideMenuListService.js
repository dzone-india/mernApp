import {
  SideMenuListSuccess,
  SideMenuListError,
} from "../redux/actions/SideMenuListAction";
import sidemenuList from "../utils/side-menu.json";
import * as Loader from "../redux/actions/LoaderActions";
export const SideMenuListService = async (dispatch, data) => {
  try {
    // const result = await ApiClient.call(
    //   ApiClient.REQUEST_METHOD.GET,
    //   API_ENDPOINTS.LOGIN_ENDPOINT,
    //   data,
    //   null,
    //   null,
    //   false
    // );
    const result = sidemenuList;
    dispatch(SideMenuListSuccess(result));
  } catch (error) {
    dispatch(SideMenuListError(error));
  }
  dispatch(Loader.hideLoader(""));
};
