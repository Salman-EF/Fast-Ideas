import  React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBInput } from 'mdbreact';
import Ionicon from 'react-ionicons'
import '../../static/modal-script';

class UpdateIdea extends Component {
    state = {
        idea: this.props.idea,
        formState: false
    }
    componentDidUpdate(prevProps){
        if(this.props.idea !== prevProps.idea) {
            this.setState({
                idea: this.props.idea
            })
        }
    }
    toggle = () => {
        this.props.toggle()
        this.setState({formState:false})
    }

    render() {
        return (
            <Container>
                <Modal id="updateModal" isOpen={this.props.isOpen} toggle={() => this.toggle()} centered>
                    { !this.state.formState ? (
                    <div>
                    <ModalHeader toggle={() => this.props.toggle()}>
                        {this.state.idea.title}
                        <Ionicon icon="md-create" color="#5ed4f3" className="icon-pointer icon-hoverable" onClick={() => this.setState({formState:true})} />
                    </ModalHeader>
                    <ModalBody>
                        {this.state.idea.content}
                    </ModalBody>
                    </div>
                    ) : (
                    <form onSubmit={this.submitHandler}>
                    <Button onClick={() => this.setState({formState:false})}>Cancel</Button>
                    </form>
                    )
                    }
                </Modal>
            </Container>
        )
    }
}

export default UpdateIdea;