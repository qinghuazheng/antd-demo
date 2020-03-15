import {MARK_NOTIFICATION_AS_READ,MARK_ALL_NOTIFICATION_AS_READ,START_MARK_AS_READ,FINISH_MARK_AS_READ,RECIVED_NOTIFICATIONS} from './actionTypes'
import {getNotifications} from '../requests'
const startMarkAsRead = () => {
    return {
        type:START_MARK_AS_READ
    }
}

const finishMarkAsRead = () => {
    return {
        type:FINISH_MARK_AS_READ
    }
}

export const markNotificationAsReadById = (id) =>{
    //异步动作 return dispatch同步动作 
    //同步动作 return 对象（动作）
    return dispatch => {
        dispatch(startMarkAsRead())
        setTimeout(()=>{
                dispatch({
                    type:MARK_NOTIFICATION_AS_READ,
                    playload:{
                        id
                    }
                })
                dispatch(finishMarkAsRead())
        },1000)
    }
}

export const markAllNotificationAsRead = () =>{
    return dispatch => {
        dispatch(startMarkAsRead())
        setTimeout(()=>{
                dispatch({
                    type:MARK_ALL_NOTIFICATION_AS_READ
                })
        },1000)
        dispatch(finishMarkAsRead())
    }
}

export const getNotificationList = () =>{
    return dispatch => {
        dispatch(startMarkAsRead())
        getNotifications().then(res=>{
            dispatch({type:RECIVED_NOTIFICATIONS,playload:{list:res.list}})
            dispatch(finishMarkAsRead())
        })
        
    }
}
