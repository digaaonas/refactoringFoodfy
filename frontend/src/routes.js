import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Logon from '../src/pages/Logon'
import Dashboard from './pages/Dashboard'
import Manager from './pages/Manager'
import NewRegister from '../src/pages/Register'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/manager" component={Manager}/>
                <Route path="/newregister" component={NewRegister}/>
            </Switch>
        </BrowserRouter>
    )
}