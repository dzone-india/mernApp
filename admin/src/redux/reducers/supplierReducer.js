import ACTION_KEYS from "../../constants/action-keys";

const initialState = {
  isRequesting: false,
  success: false,
  error: null,
  data: null,
};

const SupplierReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_KEYS.SUPPLIER_LIST_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.SUPPLIER_LIST_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        list: payload.data?.list,
      };
    case ACTION_KEYS.SUPPLIER_LIST_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };

    case ACTION_KEYS.SUPPLIER_DATA_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };
    case ACTION_KEYS.SUPPLIER_DATA_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        success: true,
        supplierData: payload.data,
      };
    case ACTION_KEYS.SUPPLIER_DATA_ERROR:
      return {
        ...state,
        isRequesting: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default SupplierReducer;
