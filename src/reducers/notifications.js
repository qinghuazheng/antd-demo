import { MARK_NOTIFICATION_AS_READ,MARK_ALL_NOTIFICATION_AS_READ,START_MARK_AS_READ,FINISH_MARK_AS_READ,RECIVED_NOTIFICATIONS} from "../actions/actionTypes"

const initState = {
    isLoading:false,
    list:[{
        id:1,
        title:"ant design part 1",
        description:"11. We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        readState:false
    },{
        id:2,
        title:"ant design part 2",
        description:"22. We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        readState:false
    },{
        id:3,
        title:"ant design part 3",
        description:"33. We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        readState:true
    }]
}

export default (state=initState,action) => {
    switch(action.type){
        case RECIVED_NOTIFICATIONS:
            return {...state,list:action.playload.list}
        case START_MARK_AS_READ:
            return {...state,isLoading:true}
        case FINISH_MARK_AS_READ:
            return {...state,isLoading:false}
        case MARK_NOTIFICATION_AS_READ:
            const newList = state.list.map(item=>{
                if(item.id === action.playload.id){
                    item.readState = true
                }
                return item
            })
            return {...state,list:newList}
        case MARK_ALL_NOTIFICATION_AS_READ:
            return {...state,list:state.list.map(item=>{
                return {...item,readState:true}
            })}  
        default:
            return state
    }
}