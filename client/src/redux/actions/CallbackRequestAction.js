import ACTION_KEYS from "../../constants/action-keys";
import { CallbackRequestService } from "../../services/CallbackRequestService";

/**
 * Call by the Component to make Login Request
 * @param {*} data 
 * @returns 
 */
export const CallbackRequestRequestAsync = (data) => {
    return (dispatch) => {
        dispatch(CallbackRequestRequest());
        CallbackRequestService(dispatch, data);
    }
}

/**
 * Action Creator to dispatch login action
 * @returns 
 */
export const CallbackRequestRequest = () => {
    return {
        type: ACTION_KEYS.CALLBACKREQUEST_REQUEST,
        payload: null,
    }
}

/**
 * Action Creator to dispatch Success
 * @param {*} data 
 * @returns 
 */
export const CallbackRequestSuccess = (data) => {
    return {
        type: ACTION_KEYS.CALLBACKREQUEST_SUCCESS,
        payload: data,
    }
}

/**
 * Action Creator to dispatch error
 * @param {*} data 
 * @returns 
 */
export const CallbackRequestError = (data) => {
    return {
        type: ACTION_KEYS.CALLBACKREQUEST_ERROR,
        payload: { error: data },
    }
}