import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null,
};

const SocialReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_KEYS.SOCIAL_DATA_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.SOCIAL_DATA_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        success: true,
        socialData: payload.data,
      };
    case ACTION_KEYS.SOCIAL_DATA_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default SocialReducer;
