import React from 'react';
import { Image } from 'semantic-ui-react';
import './ImageComponent.css';
const ImageComponent = props => {
    return (
        <Image  circular={props.circular} bordered={props.bordered} size={props.size} style={props.class}/>
    );
}

export default ImageComponent;