import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Input  from '../../components/UI/Input/Input';
import Image from '../../components/UI/ImageComponent/ImageComponent';
import { Form, Button } from 'semantic-ui-react';
import { updatedObject, checkValidity } from '../../utility/utility';


class Signup extends Component {
    state={
        signUpForm:{
            type:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 1, text: 'Customer'},
                        {value: 2, text: 'Owner'}
                    ]
                },
                inputMode: 'none',
                value: 1,
                validation: {},
                valid: true
            },
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
            mobile:{
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
        }
    }
    submitHandler = (event) => {
        event.preventDefault();
    }
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
            <Form onSubmit={this.submitHandler}>
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
            </Form>
        );

        let imageClass = {
            padding: '20px',
            margin: '30px',
            backgroundColor: 'white'
        };


        return(
           <Aux>
                <Image src='https://img.icons8.com/officel/80/000000/booking.png' size='small' circular={true} bordered={true} class={imageClass} />
                {form}
           </Aux>
        );
    }
}

export default Signup;