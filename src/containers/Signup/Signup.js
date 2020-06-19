import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import './Signup.css';
import Aux from '../../hoc/Aux/Aux';
import Input  from '../../components/UI/Input/Input';
import Image from '../../components/UI/ImageComponent/ImageComponent';
import Loader from '../../components/UI/Loader/Loader';
import Select from 'react-select';
import { updatedObject, checkValidity } from '../../utility/utility';
import * as actions from '../../store/actions/index';
const user_types = [
    {value:'2', label:'Customer'},
    {value:'1', label:'Owner'}
];
class Signup extends Component {
    state={
        signUpForm:{
        
            name:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your name'
                },
                value:'',
                validation:{
                    required: true
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            mobile_number:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Enter mobile number'
                },
                value:'',
                validation:{
                    required: true,
                    isNumeric: true,
                    minLength: 10,
                    maxLength: 10
                },
                inputMode:'numeric',
                valid: false,
                touched: false
            }
        },
        completed: false,
        type: {
            value: '2',
            label: 'Customer'
        }
    }
    submitHandler = (event) => {
        event.preventDefault();
        let data = {};
        for(let field in this.state.signUpForm){
            data[field] = this.state.signUpForm[field].value;
        }
      
        data['type'] = this.state.type.value;

        this.props.onSignUp(data);
        if(!this.props.error)
            this.setState({ completed: true });
        

    }
    handleChange = (type, value) =>{
        
        this.setState({ 
            [type]: value
        });
        
    };
    changeHandler = (event, inputIdentifier) => {

        const updatedFormElement = updatedObject( this.state.signUpForm[inputIdentifier],{
            value: event.target.value,
            valid: checkValidity(event.target.value,  this.state.signUpForm[inputIdentifier].validation),
            touched: true
        });
        
        const updatedForm = updatedObject(this.state.signUpForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            signUpForm: updatedForm,
            formIsValid: formIsValid
        });
    }

    render(){
        let formElementAr = [];
        for(let key in this.state.signUpForm){
            formElementAr.push({
                id: key,
                config: this.state.signUpForm[key] 
            });
        }
        
        let form = (
            <Form>
                <Select 
                    className="select"
                    value={this.state.type}
                    onChange={(value) => this.handleChange('type', value)}
                    placeholder="Select user type"
                    options={user_types}

                />
                { formElementAr.map(formEle => {
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
                })}
                <Button 
                    style={{backgroundColor:'#747679', color:'#FFFFFF'}}
                    onClick={this.submitHandler} content='Submit' />
            </Form>
        );

        let imageClass = {
            padding: '20px',
            margin: '30px',
            backgroundColor: 'white'
        };
        let error = null;
        if(this.props.error){
            error = <p style={{color:'red'}}>{this.props.error}</p>
        }
        if(this.props.loading){
            form = <Loader />
        }
        if(this.state.completed){
            alert('User successfully registered. Please Login to continue');
            form = <Redirect to="/login" />
        }

        return(
           <Aux>
                <Image src='https://img.icons8.com/officel/80/000000/booking.png' size='small' circular={true} bordered={true} class={imageClass} />
                {form}
                {error}
           </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (data) => dispatch(actions.signUp(data))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Signup);