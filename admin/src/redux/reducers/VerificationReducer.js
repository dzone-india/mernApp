import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null,
};

const VerificationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_KEYS.VERIFICATION_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.VERIFICATION_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        response: payload,
      };
    case ACTION_KEYS.VERIFICATION_ERROR:
      return {
        ...state,
        isRequesting: false,
        response: payload.error.response.data,
      };

    default:
      return state;
  }
};

export default VerificationReducer;
