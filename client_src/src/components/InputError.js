import React, {Component} from 'react';

class InputError extends Component {
    constructor(props){
        super(props)
    }
    render(props){
        let Error = null;
        let Validuser = this.props.validuser;
        let validcPass = this.props.validcPass;
        if(Validuser === false){
            Error = (<div className="alert alert-danger">Username allready exists.</div>);
        }
        if(validcPass === false){
            Error = (<div className="alert alert-danger">Password Not match.</div>);
        }
        return( Error)
    }
}

export default InputError;