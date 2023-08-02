import ACTION_KEYS from "../../constants/action-keys";
import { ContactusService } from "../../services/ContactusService";

/**
 * Call by the Component to make Login Request
 * @param {*} data 
 * @returns 
 */
export const ContactusRequestAsync = (data) => {
    return (dispatch) => {
        dispatch(ContactusRequest());
        ContactusService(dispatch, data);
    }
}

/**
 * Action Creator to dispatch login action
 * @returns 
 */
export const ContactusRequest = () => {
    return {
        type: ACTION_KEYS.CONTACTUS_REQUEST,
        payload: null,
    }
}

/**
 * Action Creator to dispatch Success
 * @param {*} data 
 * @returns 
 */
export const ContactusSuccess = (data) => {
    return {
        type: ACTION_KEYS.CONTACTUS_SUCCESS,
        payload: data,
    }
}

/**
 * Action Creator to dispatch error
 * @param {*} data 
 * @returns 
 */
export const ContactusError = (data) => {
    return {
        type: ACTION_KEYS.CONTACTUS_ERROR,
        payload: { error: data },
    }
}