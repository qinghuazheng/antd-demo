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
    debugger
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('userInfo')
    return {
        type:LOGIN_FAILED
    }
}

export const logout = () => {
    return dispatch=>{
        dispatch(loginFailed())
    }
}

export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo)
        .then(res=>{
            // console.log(res)
            if(res.data.code===200){
                const {remember} = userInfo
                const {authToken,...user} = res.data.data
                console.log(userInfo)
                if(remember){
                    localStorage.setItem('authToken',authToken)
                    localStorage.setItem('userInfo',JSON.stringify(user))
                }else{
                    sessionStorage.setItem('authToken',authToken)
                    sessionStorage.setItem('userInfo',JSON.stringify(user))
                }
                dispatch(loginSuccess(user))
            }else{
                dispatch(loginFailed())
            }
        })
    }
}