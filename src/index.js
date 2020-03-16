import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {Provider}  from 'react-redux'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
import store from './store'
import './index.css'

//将不需要登录(不需要权限)的页面放在App的同级
import {mainRoutes} from './router'
ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/admin" component={App} />
                    {/* 后期需要做鉴权 */}
                    {/* <Route path="/admin" render={(routerProps)=>{return store.getState().user.isLogin ? <App {...routerProps}/> : <Redirect to="/login" />}} /> */}
                    {/*
                        需求一：/进来后redirect到admin，在admin渲染前进行判断，看看是否有权限，没有的话再redirect到login
                        需求二: /进来后redirect到login
                    */}
                    {
                        mainRoutes.map(route=>{
                            return <Route 
                            key={route.pathname} path={route.pathname} component={route.component}/>   
                        })
                    }
                    <Redirect to="/admin" from="/" exact />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
     document.getElementById('root')
)

