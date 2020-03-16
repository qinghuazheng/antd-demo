import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { adminRoutes } from './router'
import {Frame} from './components'

const menus = adminRoutes.filter(item=>item.isNav===true)

const mapStateToProps = (state) => ({
    isLogin:state.user.isLogin
})
@connect(mapStateToProps)
class App extends Component{
    render = ()=>(
        this.props.isLogin ?
            <Frame menus={menus}>
            <Switch>
                {            
                adminRoutes.map(route=>{
                    return <Route 
                                key={route.pathname} 
                                path={route.pathname} 
                                exact={route.exact}
                                render={(routerProps)=>{
                                    return <route.component {...routerProps}
                                    />
                                }}
                            />   
                })
                }
                <Redirect to={adminRoutes[0].pathname} from="/admin" exact/>
                <Redirect to="/404" />
            </Switch>
            {/* <div>公共部分</div> */}
            {/* 后期根据角色不同也有权限 */}
            </Frame> :
            <Redirect to="/login" />   
    )
}
export default App