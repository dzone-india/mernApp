import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null,
};

const BlogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_KEYS.ROLE_LIST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.ROLE_LIST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        list: payload.data,
      };
    case ACTION_KEYS.ROLE_LIST_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };

    case ACTION_KEYS.ROLE_DATA_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.ROLE_DATA_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        success: true,
        roleData: payload.data,
      };
    case ACTION_KEYS.ROLE_DATA_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,

      };

    //role menu list

    case ACTION_KEYS.ROLE_MENU_LIST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.ROLE_MENU_LIST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        success: true,
        menuList: payload.data,
      };
    case ACTION_KEYS.ROLE_MENU_LIST_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,

      };
    default:
      return state;
  }
};

export default BlogReducer;
