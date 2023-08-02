import ACTION_KEYS from "../../constants/action-keys";
import { EnquiryService } from "../../services/EnquiryService";

/**
 * Call by the Component to make Login Request
 * @param {*} data 
 * @returns 
 */
export const EnquiryRequestAsync = (data) => {
    return (dispatch) => {
        dispatch(EnquiryRequest());
        EnquiryService(dispatch, data);
    }
}

/**
 * Action Creator to dispatch login action
 * @returns 
 */
export const EnquiryRequest = () => {
    return {
        type: ACTION_KEYS.ENQUIRY_REQUEST,
        payload: null,
    }
}

/**
 * Action Creator to dispatch Success
 * @param {*} data 
 * @returns 
 */
export const EnquirySuccess = (data) => {
    return {
        type: ACTION_KEYS.ENQUIRY_SUCCESS,
        payload: data,
    }
}

/**
 * Action Creator to dispatch error
 * @param {*} data 
 * @returns 
 */
export const EnquiryError = (data) => {
    return {
        type: ACTION_KEYS.ENQUIRY_ERROR,
        payload: { error: data },
    }
}