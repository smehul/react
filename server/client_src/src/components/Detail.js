import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:'',
            id:localStorage.getItem('userId')
        }
    }  
    
    componentWillMount(){
        this.getDetails();

        if(this.state.id === ""){
            this.props.history.push('/');
        }
    }

    getDetails(){
        axios.get(`http://localhost:3000/api/demos/${this.state.id}`)
        .then(response =>{
            this.setState({
                users:response.data
            }, () => {
                console.log(this.state);
            })
        })
        .catch(err => console.log(err));
    }

    onDelete(){
        let userId = this.state.users.id;
        axios.delete(`http://localhost:3000/api/demos/${userId}`)
            .then(response => {
                this.props.history.push('/');
            }).catch(err => console.log(err));
    }   

    logout(){
        localStorage.setItem('userId','');
        this.props.history.push('/');
    }

    render(){
        return(
            
            <div>
                <div className="container">
                    <h1>Welcome ..{this.state.users.firstname} {this.state.users.lastname} !</h1>
                        
                        <button onClick={this.onDelete.bind(this)} className="btn red right"> Delect Account </button>
                        <button onClick={this.logout.bind(this)} className="btn red lefft"> Logout </button>
                    <hr/>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="text-center">
                                <img src={`${this.state.users.img}`} className="avatar img-circle" alt="avatar"/>
                                <h6>Upload a different photo...</h6>
                            </div>
                        </div>
                    <div className="col-md-9 personal-info">

                        <h3>Profile info</h3>
                        <hr/>
                        <ul class="collection">
                            <li class="collection-item">Username: {this.state.users.username}</li>
                            <li class="collection-item">Firstname: {this.state.users.firstname}</li>
                            <li class="collection-item">Lastname: {this.state.users.lastname}</li>
                            <li class="collection-item">Email: {this.state.users.email}</li>
                            <li class="collection-item">Address: {this.state.users.address}</li>
                            <li class="collection-item">Contact: {this.state.users.contact}</li>
                        </ul>
                            <Link to="/edit" className="btn blue"> Edit Data </Link>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
        )
    }
}

export default Detail;