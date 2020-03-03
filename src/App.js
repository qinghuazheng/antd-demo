import React,{Component} from 'react'
import {HashRouter as Router, Route, Switch } from 'react-router-dom'
import {DashBoard,Login,Error} from './pages'
const App = ()=>(
    <Router>
        <Switch>
            <Route exact path="/admin/" component={DashBoard}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Error}/>
        </Switch>
    </Router>
)

export default App