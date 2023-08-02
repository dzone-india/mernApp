import ACTION_KEYS from "../../constants/action-keys";
import { RegisterService } from '../../services/RegisterService';

export const RegisterRequestAsync = (data) => {
    return (dispatch) => {
        dispatch(RegisterRequest());
        RegisterService(dispatch, data);
    }
}

export const RegisterRequest = () => {
    return {
        type: ACTION_KEYS.REGISTER_REQUEST,
        payload: null,
    }
}

export const RegisterSuccess = (data) => {
    return {
        type: ACTION_KEYS.REGISTER_SUCCESS,
        payload: data,
    }
}

export const RegisterError = (data) => {
    return {
        type: ACTION_KEYS.REGISTER_ERROR,
        payload: { error: data },
    }
}