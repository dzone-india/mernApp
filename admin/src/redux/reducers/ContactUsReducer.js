import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null,
};

const ContactUsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_KEYS.CONTACTUS_LIST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.CONTACTUS_LIST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        list: payload.data,
      };
    case ACTION_KEYS.CONTACTUS_LIST_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default ContactUsReducer;
