import {createStore,applyMiddleware} from 'redux'
//applyMiddleWare处理异步请求操作
import thunk from 'redux-thunk'
import rootReducers from './reducers'

export default createStore(rootReducers,applyMiddleware(thunk))