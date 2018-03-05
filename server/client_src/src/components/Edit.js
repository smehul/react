import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Edit extends Component {
   
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
            file: '',
            imagePreviewUrl: '',
            changePic:false,
        }
    }  
    
    componentWillMount(){
        this.getUserDetails();
        if(this.state.id === ""){
            this.props.history.push('/');
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

    editUser(updateUser){
        console.log
        axios.request({
            method:'put',
            url:`http://localhost:3000/api/demos/${this.state.id}`,
            data: updateUser
        }).then(response => {
            console.log(updateUser);
            this.props.history.push(`/user`);
        }).catch(err => console.log(err));
        
    }

    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
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

    onSubmit(e){    
        let setImg = this.state.img;
        if(this.state.changePic){
            setImg = this.state.file;
        }
        const updateUser = {
            username: this.refs.uname.value,
            firstname: this.refs.fname.value,
            lastname: this.refs.lname.value,
            img: this.state.file,
            address: this.refs.address.value,
            email: this.refs.email.value,
            password: this.refs.pass.value,
            contact: this.refs.contact.value
        }
        console.log(updateUser)
        //this.editUser(updateUser);
        e.preventDefault();
    }
    render(){
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
              file: this.state.img,
              imagePreviewUrl: reader.result
            });
        }
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
       
        if (this.state.changePic) {
            $imagePreview = (<img src={imagePreviewUrl} className="profile-pic"/>);
        } else {
            $imagePreview = (<img src={this.state.img} className="profile-pic"/>);
        }
        return(
            <div>
                <h1><u>Update User Details</u></h1><br/>
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
                                <input onChange={this.handleInputChange.bind(this)} value={this.state.uname} type="text" name="uname" ref="uname"/>
                                <label htmlFor="uname" className="active">Username</label>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="input-field col s3">
                                <input onChange={this.handleInputChange.bind(this)} type="text" value={this.state.fname} name="fname" ref="fname"/>
                                <label htmlFor="fname" className="active">First Name</label>
                            </div>
                            <div className="input-field col s3">
                                <input onChange={this.handleInputChange.bind(this)} type="text" value={this.state.lname} name="lname" ref="lname"/>
                                <label htmlFor="lname" className="active">Last Name</label>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s6">
                                <input onChange={this.handleInputChange.bind(this)} type="email" value={this.state.email} name="email" ref="email"/>
                                <label htmlFor="email" className="active">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <input onChange={this.handleInputChange.bind(this)} type="password" value={this.state.password}  name="pass" ref="pass"/>
                                <label htmlFor="pass" className="active">Password</label>
                            </div>
                            <div className="input-field col s3">
                                <input onChange={this.handleInputChange.bind(this)} type="password"  name="cpass" ref="cpass"/>
                                <label htmlFor="cpass" className="active">Confirm Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                            <textarea onChange={this.handleInputChange.bind(this)} value={this.state.address} id="textarea1" name="address" className="materialize-textarea" ref="address"></textarea>
                                <label htmlFor="address" className="active">Address</label>
                            </div>
                        </div>
                        <div className="row">
                        <div className="input-field col s3">
                                <input onChange={this.handleInputChange.bind(this)} type="text" value={this.state.contact} name="contact" ref="contact"/>
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

export default Edit;