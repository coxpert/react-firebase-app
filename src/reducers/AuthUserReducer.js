/**
 * Auth User Reducers
 */
import {
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,

    LOGOUT_USER,

    SIGNUP_USER_START,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    //send email verification
    SEND_RESETPASSWORD_EMAIL_START,
    SEND_RESETPASSWORD_EMAIL_SUCCESS,
    SEND_RESETPASSWORD_EMAIL_FAILURE,

} from 'Actions/types';

/**
 * initial auth user
 */

const INIT_STATE = {
    user: localStorage.getItem('myapp_user')?JSON.parse(localStorage.getItem('myapp_user')):null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER_START:
            return { ...state };

        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload };

        case LOGIN_USER_FAILURE:
            return { ...state };

        case LOGOUT_USER:
            return { ...state, user: null };

        case SIGNUP_USER_START:
            return { ...state };

        case SIGNUP_USER_SUCCESS:
            return { ...state, user: action.payload };

        case SIGNUP_USER_FAILURE:
            return { ...state, };

        case SEND_RESETPASSWORD_EMAIL_START:
            return { ...state, };

        case SEND_RESETPASSWORD_EMAIL_SUCCESS:
            return { ...state, };

        case SEND_RESETPASSWORD_EMAIL_FAILURE:
            return { ...state, };

        default: return { ...state };
    }
}
