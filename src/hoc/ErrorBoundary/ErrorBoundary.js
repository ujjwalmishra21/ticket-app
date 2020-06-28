import React, {Component} from 'react';
import {Modal, Header, Button, Icon} from 'semantic-ui-react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: '',
        errorInfo: '',
        showModal: false
    };
    onShowModal = () => {
        this.setState({showModal: true });
    };
    onCloseModal = () => {
        this.setState({showModal: false})
    };
    static getDerivedStateFromError(error){
        return { hasError: true};
    }

    componentDidCatch(error, errorInfo){
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render(){
        if(this.props.hasError){
            return (
                <Modal basic size='small' open={this.state.hasError} onClose={this.onCloseModal}>
                    <Header icon='archive' content='Error' />
                    <Modal.Content>
                    <p>
                        {this.state.error}
                    </p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button basic color='red' inverted onClick={this.onCloseModal}>
                        <Icon name='remove' /> Close
                    </Button>
                    
                    </Modal.Actions>
                </Modal>

            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
