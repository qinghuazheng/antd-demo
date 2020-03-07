import axios from 'axios'
import {message} from 'antd'
const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL:isDev?'https://www.studyinghome.com/mock/5e5328e72cb0d073b8139e47/example':'',
    headers: {'X-Custom-Header': 'foobar'},
})

service.interceptors.request.use((config)=>{
    //增加请求字段 Request Payload
    config.data = Object.assign({},config.data,{
        authToken:'zhongguo'
        // authToken:localStorage.getItem('authToken')
    })
    return config
})

service.interceptors.response.use((response)=>{
    if(response.data.code === 200){
        return response.data.data
    }else{
        message.error(response.data.errMsg)
    }
})

export const getArticles = ({offset=0,limit=10}={})=>{
    return service.get('/articleList',{params:{offset,limit}})
}