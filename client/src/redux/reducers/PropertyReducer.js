import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null,
};

const PropertyListReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_KEYS.GET_PROPERTY_LIST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.GET_PROPERTY_LIST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        data: payload,
      };
    case ACTION_KEYS.GET_PROPERTY_LIST_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };

      case ACTION_KEYS.GET_PROPERTY_DETAIL_REQUEST:
        return {
          ...state,
          isRequesting: true,
        };
      case ACTION_KEYS.GET_PROPERTY_DETAIL_SUCCESS:
        return {
          ...state,
          isRequesting: false,
          propertyData: payload.data,
        };
      case ACTION_KEYS.GET_PROPERTY_DETAIL_ERROR:
        return {
          ...state,
          isRequesting: false,
          error: payload.error,
        };
      default:
      return state;
  }
};

export default PropertyListReducer;
