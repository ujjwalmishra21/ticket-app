import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Input from '../../components/UI/Input/Input';
import { checkValidity, updatedObject } from '../../utility/utility';
import { Redirect } from 'react-router-dom';

class OTP extends Component {
    state = {
        otpForm:{
            otp:{
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            value:'',
            validation:{
                required: true,
                isNumeric: true,
                minLength: 4,
                maxLength: 4
            },
            inputMode:'numeric',
            valid: true,
            touched: true
            }
        },
        formIsValid: false,
        redirectToLogin: false
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAuth(this.props.mobile_number, this.state.otpForm.otp.value)
    }

    onResendOTP = (event) => {
        event.preventDefault();
        if(this.props.mobile_number){
            this.props.onAuthInit(this.props.mobile_number);
        }
        else{
            this.setState({
                redirectToLogin: true
            });
        }    
    }

    componentDidMount(){
        // if(!this.props.b && this.props.authRedirectPath !== '/'){
        //     this.props.onSetAuthRedirectPath();
        // }
    }

    changeHandler = (event, inputIdentifier) => {
        
        const updatedFormElement = updatedObject( this.state.otpForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.otpForm[inputIdentifier].validation),
            touched:true
        });

        const updatedForm = updatedObject(this.state.otpForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;

        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            otpForm: updatedForm,
            formIsValid: formIsValid
        });
        
    }

    render(){

        let formElementAr = [];

        for(let key in this.state.otpForm){
            formElementAr.push({
                id: key,
                config:this.state.otpForm[key]
            });
        }
        
        let form = (
            <Form>
                { formElementAr.map((formEle) => {
                        return (
                            <Input 
                                key={formEle.id}
                                elementType={formEle.config.elementType}
                                elementConfig={formEle.config.elementConfig}
                                value={formEle.config.value}
                                invalid={!formEle.config.valid}
                                shouldValidate={formEle.config.validation}
                                touched={formEle.config.touched}
                                inputMode={formEle.config.inputMode}
                                changed={(event) => this.changeHandler(event, formEle.id)}
                            />
                        );
                    })                 
                }
                <Button 
                    disabled={this.props.loading} 
                    loading={this.props.loading} 
                    onClick={this.onSubmit} 
                    className="ui button">Submit</Button>
                <Button 
                    style={{marginLeft: '10px'}} 
                    disabled={this.props.loading} 
                    loading={this.props.loading} 
                    onClick={this.onResendOTP} 
                    className="ui button">Resend OTP</Button>
            </Form>
        );
        
        let redirect = null;
        if(this.props.isAuthenticated){
            redirect = <Redirect to="/" />
        }else if(this.state.redirectToLogin){
            redirect = <Redirect to="/login"/>
        }
        return (
            <Aux>
                {redirect}
                {form}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        mobile_number: state.auth.mobile_number,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (mobile_number, otp) => dispatch(actions.auth(mobile_number, otp)),
        onAuthInit: (mobile_number) => dispatch(actions.authInit(mobile_number)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);