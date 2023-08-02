import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null
};

const ModuleRightsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
      
    case ACTION_KEYS.MODULE_RIGHTS_REQUEST:
        console.log("type===", type)
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.MODULE_RIGHTS_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        data: payload,
      };
    case ACTION_KEYS.MODULE_RIGHTS_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default ModuleRightsReducer;
