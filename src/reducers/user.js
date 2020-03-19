import {START_LOGIN,LOGIN_SUCCESS,LOGIN_FAILED} from '../actions/actionTypes'
const isLogin = Boolean(localStorage.getItem('authToken')) || Boolean(sessionStorage.getItem('authToken'))
const userInfo =JSON.parse(localStorage.getItem('userInfo')) || JSON.parse(sessionStorage.getItem('userInfo'))
const initState = {
    ...userInfo,
    isLogin,
    isLoading:false
}

export default (state=initState,action) => {
    console.log(action)
    switch(action.type){
        case START_LOGIN:
            return {
                ...state,
                isLoading:true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.playload.userInfo,
                isLogin:true,
                isLoading:false
            }
        case LOGIN_FAILED:
            return {
                id:'',
                avatar:'',
                displayName:'',
                isLogin:false,
                isLoading:false,
                role:''
            }
        default:
            return state
    }
}