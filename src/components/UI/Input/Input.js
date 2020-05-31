import React from 'react';
import { Form, Select } from 'semantic-ui-react'
const input = (props) => {
    
    let inputElement = null;
    let validError = null;
    if(props.invalid && props.shouldValidate && props.touched){
        validError = <p>Please enter a valid value</p>
    }

    switch(props.elementType){
        case 'input':
            inputElement = <Form.Input 
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}
                                inputMode={props.inputMode}    
                            />;
        break;
        case 'select':
            inputElement = <Select
                                value={props.value}
                                onChange={props.changed}
                                options={props.elementConfig.options}
                            />;
        break;
        default:
            inputElement = null;
        break;

    }

    return (
        <div style={{marginBottom:'10px'}}>
            {inputElement}
            {validError}
        </div>
    )
}

export default input;

