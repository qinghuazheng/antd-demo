import {START_LOGIN,LOGIN_SUCCESS,LOGIN_FAILED} from './actionTypes'
import {loginRequest} from '../requests'

const startLogin = () => {
    return {
        type:START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type:LOGIN_SUCCESS,
        playload:{userInfo}
    }
}

const loginFailed = () => {
    return {
        type:LOGIN_FAILED
    }
}

export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo)
        .then(res=>{
            // console.log(res)
            if(res.data.code===200){
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(loginFailed())
            }
        })
    }
}