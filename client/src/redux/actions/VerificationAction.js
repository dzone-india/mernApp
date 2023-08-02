import ACTION_KEYS from "../../constants/action-keys";
import { VerificationService } from "../../services/VerificationService";

/**
 * Call by the Component to make Verification Request
 * @param {*} data 
 * @returns 
 */
export const VerificationRequestAsync = (data) => {
    return (dispatch) => {
        dispatch(VerificationRequest());
        VerificationService(dispatch, data);
    }
}

/**
 * Action Creator to dispatch Verification action
 * @returns 
 */
export const VerificationRequest = () => {
    return {
        type: ACTION_KEYS.VERIFICATION_REQUEST,
        payload: null,
    }
}

/**
 * Action Creator to dispatch Success
 * @param {*} data 
 * @returns 
 */
export const VerificationSuccess = (data) => {
    return {
        type: ACTION_KEYS.VERIFICATION_SUCCESS,
        payload: data,
    }
}

/**
 * Action Creator to dispatch error
 * @param {*} data 
 * @returns 
 */
export const VerificationError = (data) => {
    return {
        type: ACTION_KEYS.VERIFICATION_ERROR,
        payload: { error: data },
    }
}