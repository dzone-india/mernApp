import ACTION_KEYS from "../../constants/action-keys";
import { SitevisitService } from "../../services/SitevisitService";

/**
 * Call by the Component to make Login Request
 * @param {*} data 
 * @returns 
 */
export const SitevisitRequestAsync = (data) => {
    return (dispatch) => {
        dispatch(SitevisitRequest());
        SitevisitService(dispatch, data);
    }
}

/**
 * Action Creator to dispatch login action
 * @returns 
 */
export const SitevisitRequest = () => {
    return {
        type: ACTION_KEYS.SITEVISIT_REQUEST,
        payload: null,
    }
}

/**
 * Action Creator to dispatch Success
 * @param {*} data 
 * @returns 
 */
export const SitevisitSuccess = (data) => {
    return {
        type: ACTION_KEYS.SITEVISIT_SUCCESS,
        payload: data,
    }
}

/**
 * Action Creator to dispatch error
 * @param {*} data 
 * @returns 
 */
export const SitevisitError = (data) => {
    return {
        type: ACTION_KEYS.SITEVISIT_ERROR,
        payload: { error: data },
    }
}