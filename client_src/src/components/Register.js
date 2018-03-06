import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputError from './InputError';
class Register extends Component {
    constructor(){
        super();
        this.state = {
            file: '',
            imagePreviewUrl: '',
            changePic:false,
            validcPass:''
        }
    }
    addUser(NewUser){
        axios.request({
            method:'post',
            url:'http://localhost:3000/api/demos',
            data: NewUser
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err)); 
    }

    onSubmit(e){
        let setImg = this.state.imagePreviewUrl;
        
        const NewUser = {
            username: this.refs.uname.value,
            firstname: this.refs.fname.value,
            lastname: this.refs.lname.value,
            img: setImg,
            address: this.refs.address.value,
            email: this.refs.email.value,
            password: this.refs.pass.value,
            cpassword: this.refs.cpass.value,
            contact: this.refs.contact.value
        }
        let valid = this.checkInput(NewUser);
        
        if(valid == true){
           this.addUser(NewUser);
        }
        e.preventDefault();
    }

    checkInput(updateUser){
        let pass = updateUser.password;
        let cpass = updateUser.cpassword;
        if(pass !== cpass){
            this.setState({
                validcPass:false
            })
            return false;
        }
        else{
            return true;
        }
    }

    _handleImageChange(e) {
        e.preventDefault();
        this.setState({
            changePic:true
        })
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(e.target.files[0])
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    render(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
       
        if (this.state.changePic) {
            $imagePreview = (<img src={imagePreviewUrl} className="profile-pic"/>);
        } else {
            $imagePreview = (<img src="https://steemitimages.com/0x0/https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png" className="profile-pic"/>);
        }
        return(
            <div>
                <h1><u>Create new User</u></h1><br/>
                <InputError validcPass = {this.state.validcPass}/>
                <div className="row">
                    
                    <form  onSubmit={this.onSubmit.bind(this)}>
                        <div className="row">
                        <div className="col-md-5">
                            <div className="imgPreview">
                                    {$imagePreview}
                                </div>
                                <input className="fileInput" 
                                    type="file" 
                                    onChange={(e)=>this._handleImageChange(e)} ref="img" name="img"/> 
                                 
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="text" name="uname" ref="uname"/>
                                <label htmlFor="uname" className="active">Username</label>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="input-field col s3">
                                <input type="text"  name="fname" ref="fname"/>
                                <label htmlFor="fname" className="active">First Name</label>
                            </div>
                            <div className="input-field col s3">
                                <input type="text" name="lname" ref="lname"/>
                                <label htmlFor="lname" className="active">Last Name</label>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s6">
                                <input type="email" name="email" ref="email"/>
                                <label htmlFor="email" className="active">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <input type="password"  name="pass" ref="pass"/>
                                <label htmlFor="pass" className="active">Password</label>
                            </div>
                            <div className="input-field col s3">
                                <input type="password"  name="cpass" ref="cpass"/>
                                <label htmlFor="cpass" className="active">Confirm Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <textarea id="textarea1" name="address" className="materialize-textarea" ref="address"></textarea>
                                <label htmlFor="address" className="active">Address</label>
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-field col s3">
                                <input type="text"  name="contact" ref="contact"/>
                                <label htmlFor="contact" className="active">Contact No</label>
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" value="Submit" className="btn blue"/><span> </span>
                            <Link to="/" className="btn grey">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;