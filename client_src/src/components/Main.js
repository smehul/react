import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Edit from './Edit';
import Detail from './Detail';
import Forget from './Forget';
import ResetPass from './ResetPass'
const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/user" component={Detail}/>
            <Route exact path="/edit" component={Edit}/>
            <Route exact path="/forget" component={Forget}/>
            <Route exact path="/resetpassword" component={ResetPass}/>
        </Switch>
    </main>
) 

export default Main;