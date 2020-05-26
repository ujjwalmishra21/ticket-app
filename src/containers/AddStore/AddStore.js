import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import Input from '../../components/UI/Input/Input';
import Aux from '../../hoc/Aux/Aux';
// import * as actions from '../../store/actions/index';
import { checkValidity, updatedObject } from '../../utility/utility';

class AddStore extends Component{
    state={
        addStoreForm:{
            store_name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your store name'
                },
                value:'',
                validation:{
                    required: true
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: '',
                validation:{
                    required: true
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            locality:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your locality'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                valid: false,
                touched: false
            },
            landmark:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your landmark'
                },
                value: '',
                validation: {},
                inputMode:'text',
                valid: false,
                touched: false
            },
            city:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your city'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                inputMode:'text',
                valid: false,
                touched: false
            },
            state:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your state'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                inputMode:'text',
                valid: false,
                touched: false
                
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your country'
                },
                value: '',
                validation: {
                    required: 'text',
                },
                inputMode:'text',
                valid: false,
                touched: false

            },
            zip:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your zip code'
                },
                value: '',
                validation: {
                    required: 'text',
                    isNumeric: true,
                    minLength: 6,
                    maxLength: 6
                },
                inputMode:'numeric',
                valid: false,
                touched: false

            }
        },
        formIsValid: false
    };
    
    onSubmit = (event) => {
        event.preventDefault();
    }
    changeHandler = (event, inputIdentifier) => {
        
        const updatedFormElement= updatedObject(this.state.addStoreForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.addStoreForm[inputIdentifier].validation),
            touched: true
        });

        const updatedForm = updatedObject(this.state.addStoreForm,{
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            addStoreForm: updatedForm,
            formIsValid: formIsValid
        })

    }

    render(){

        let formElementAr = [];

        for(let key in this.state.addStoreForm){
            formElementAr.push({
                id: key,
                config: this.state.addStoreForm[key]
            });
        }
        
        var form = (
            <Form>
                {
                    formElementAr.map((formEle) => {
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
                                changed={(event)=> this.changeHandler(event, formEle.id)}
                            />
                        );

                    })
                }
                <Button className="ui button" onClick={(event)=>this.onSubmit(event)}>Add Store</Button>
            </Form>
        );

        return (
            <Aux>
                <h1>Add store</h1>
                {form}
            </Aux>
        );
    }
}
// const mapStateToProps = state => {
//     return {
//         userData: state.auth.userData
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {

//     };
// }

export default AddStore;