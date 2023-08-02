import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null,
  isAuth: true,
};

const SitevisitReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_KEYS.SITEVISIT_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.SITEVISIT_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        data: payload,
      };
    case ACTION_KEYS.SITEVISIT_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default SitevisitReducer;
