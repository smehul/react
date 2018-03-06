import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputError from './InputError';
class ResetPass extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            id:localStorage.getItem('userId'),
            uname:'',
            fname:'',
            lname:'',
            img:'',
            email:'',
            address:'',
            contact:'',
            password:'',
            validcPass:''
        }
    }

    getUserDetails(){
        axios.get(`http://localhost:3000/api/demos/${this.state.id}`)
        .then(response =>{
            this.setState({
                id:response.data.id,
                uname:response.data.username,
                fname:response.data.firstname,
                lname:response.data.lastname,
                email:response.data.email,
                img:response.data.img,
                address:response.data.address,
                contact:response.data.contact,
                password:response.data.password
            }, () => {
               console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }

    componentWillMount(){
        this.getUserDetails();
        if(this.state.id === ""){
            this.props.history.push('/');
        }
    }

    editUser(updateUser){
        console.log
        axios.request({
            method:'put',
            url:`http://localhost:3000/api/demos/${this.state.id}`,
            data: updateUser
        }).then(response => {
            console.log(updateUser);
            localStorage.setItem('userId','');
            this.props.history.push('/');
        }).catch(err => console.log(err));
        
    }

    onSubmit(e){   
        e.preventDefault();
        const passValue = {
            username: this.state.uname,
            firstname: this.state.fname,
            lastname: this.state.lname,
            img: this.state.img,
            address: this.state.address,
            email: this.state.email,
            contact: this.state.contact,
            password: this.refs.pass.value,
            cpass: this.refs.cpass.value
        }
        console.log(passValue)
        let valid = this.checkInput(passValue);
        console.log(valid)
        if(valid == true){
            this.editUser(passValue);
        }
       
    }

    checkInput(passValue){
        let pass = passValue.password;
        let cpass = passValue.cpass;
        if(pass !== cpass ){
            this.setState({
                validcPass:false
            })
            return false;
        }
        else{
            return true;
        }
    }

    render(){
        
        let $imagePreview = (<img src={this.state.img} className="profile-pic"/>);
        return(
            <div>
                <h1><u>Reset Your Password</u></h1><br/>
                <InputError validcPass = {this.state.validcPass}/>
                <div className="row">
                            <div className="col-md-5">
                                <div className="imgPreview">
                                    {$imagePreview}
                                    <h2> {this.state.fname} {this.state.lname} </h2>
                                </div>
                            </div>
                        </div>
                <div className="row">
                    <form  onSubmit={this.onSubmit.bind(this)}>
                       
                        <div className="row">
                            <div className="input-field col s3">
                                <input required  type="password"  name="pass" ref="pass"/>
                                <label htmlFor="pass" className="active">Password</label>
                            </div>
                            <div className="input-field col s3">
                                <input  type="password"   name="cpass" ref="cpass"/>
                                <label htmlFor="cpass" className="active">Confirm Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <input required type="submit" value="Submit" className="btn blue"/><span> </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ResetPass;
