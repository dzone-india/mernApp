import ACTION_KEYS from "../../constants/action-keys";
import { SupplierService } from "../../services/SupplierService";

/**
 * Call by the Component to make Login Request
 * @param {*} data 
 * @returns 
 */
export const SupplierRequestAsync = (data) => {
    return (dispatch) => {
        dispatch(SupplierRequest());
        SupplierService(dispatch, data);
    }
}

/**
 * Action Creator to dispatch login action
 * @returns 
 */
export const SupplierRequest = () => {
    return {
        type: ACTION_KEYS.SUPPLIER_REQUEST,
        payload: null,
    }
}

/**
 * Action Creator to dispatch Success
 * @param {*} data 
 * @returns 
 */
export const SupplierSuccess = (data) => {
    return {
        type: ACTION_KEYS.SUPPLIER_SUCCESS,
        payload: data,
    }
}

/**
 * Action Creator to dispatch error
 * @param {*} data 
 * @returns 
 */
export const SupplierError = (data) => {
    return {
        type: ACTION_KEYS.SUPPLIER_ERROR,
        payload: { error: data },
    }
}