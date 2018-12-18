import  React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class UpdateIdea extends Component {
    state = {
        idea: this.props.idea,
    }
    componentDidUpdate(prevProps){
        if(this.props.idea !== prevProps.idea) {
            this.setState({
                idea: this.props.idea
            })
        }
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.props.isOpen} toggle={() => this.props.toggle()} centered>
                    <ModalHeader toggle={() => this.props.toggle()}>{this.state.idea.title}</ModalHeader>
                    <ModalBody>
                        {this.state.idea.content}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.props.toggle()}>Close</Button>
                        <Button color="primary">Save changes</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}

export default UpdateIdea;