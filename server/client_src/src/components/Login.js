import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginError from './LoginError';
import Loader from './Loader';
class Login extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            userlogin: '',
        }
         
    }
    getUsers(){
        axios.get('http://localhost:3000/api/demos')
            .then(response =>{
                this.setState({
                    users:response.data
                }, () => {
                   console.log(this.state);
                })
            })
            .catch(err => console.log(err));
    }
     
    componentWillMount(){
        this.getUsers(); 
        let userId =  localStorage.getItem('userId'); 
        if(userId){
            this.props.history.push('/user');
        }  
    }
    
    onSubmit(e){
        const login = {
            username: this.refs.uname.value,
            password: this.refs.pass.value
        }
        const user = this.state.users.map((user, i)=>{
            let id = user.id; 
            console.log(user.password, user.username)
            console.log(login.password)

            if( (user.username === login.username || user.email === login.username ) && user.password === login.password){
                localStorage.setItem('userId', id);
                this.props.history.push(`/user`);
                this.setState({
                    userlogin: true
                })
            } 
            else {
                this.setState({
                    userlogin: false
                })
                console.log(this.state.userlogin)
            }
        })
        
        e.preventDefault();
    }

    render(){
        const isLogged = this.state.userlogin;
        let display = null;
        if(isLogged === false) {
            display = <LoginError />
        }
        if(isLogged === true) {
                display = <Loader />
        }

        return(
            <div>
        
                <h1><u>User Login</u></h1><br />
                {display}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input type="text" name="uname" ref="uname"/>
                            <label htmlFor="uname" className="active" >Username/Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input type="password" name="pass" ref="pass"/>
                            <label  htmlFor="pass" className="active" >Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input className="btn blue" type="submit" value="Login"/>
                        <span> </span>    <Link to="/register" className="waves-effect waves-light btn" > create New User </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;