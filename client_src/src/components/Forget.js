import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ForgetError from './ForgetError';

class Forget extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            valid: ''
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
        const email = this.refs.email.value;
        const user = this.state.users.map((user, i)=>{
            let id = user.id; 
            console.log(user.password, user.username)
            
            if(user.email === email){
                localStorage.setItem('userId', id);
                this.props.history.push(`/user`);
                this.setState({
                    valid: true
                })
            } 
            else {
                this.setState({
                    valid: false
                })
            }
        })
        
        e.preventDefault();
    }
    render(){
        const valid = this.state.valid;
        let display = null;
        if(valid === false) {
            display = <ForgetError />
        }
       
        return(
            <div>
        
                <h1><u>Find Your Password</u></h1><br />
                {display}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input type="email" name="email" ref="email" required/>
                            <label htmlFor="email" className="active" >Enter your Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input className="btn blue" type="submit" value="Send request to your email"/>
                        <span> </span>    <Link to="/" className="btn grey" > Cancel </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Forget;