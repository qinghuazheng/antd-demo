import {START_LOGIN,LOGIN_SUCCESS,LOGIN_FAILED} from '../actions/actionTypes'
const initState = {
    id:'',
    displayName:'',
    avatar:'',
    role:'',
    isLogin:false,
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
            return initState
        default:
            return state
    }
}