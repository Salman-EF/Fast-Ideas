import  React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBInput } from 'mdbreact';
import Ionicon from 'react-ionicons'
import '../../static/modal-script';

class UpdateIdea extends Component {
    state = {
        idea: this.props.idea,
        formState: false,
        ideaChanged: 'disabled'
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
    changeHandler = (e) => {
        let target = e.target
        if (target.id==='title' && target.value!=null && target.value!=='') {
            this.setState({ ideaChanged: '' })
        } else if(target.id==='content') {} 
        else {this.setState({ ideaChanged: 'disabled' })}

        let idea = {...this.state.idea}
        idea[target.id] = target.value
        this.setState({idea})
    }
    submitHandler = (e) => {
        e.preventDefault()
        console.log("Submit: "+this.state.idea.id)
        /* let ideaChanged = this.state.ideaChanged
        if (ideaChanged==='') {
            this.addIdea(this.state.idea)
            this.initializeState()
        } */
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
                        <div className="md-form">
                            <MDBInput id="title" hint="Idea title" className="text-center"
                                    onChange={this.changeHandler} value={this.state.idea.title} />
                            <MDBInput id="content" type="textarea" rows="5" hint="So What's your Crazy Idea..." className="mb-0"
                                    onChange={this.changeHandler} value={this.state.idea.content} />
                        </div>
                        <ModalFooter>
                            <Button color="#FFF" className="btn-link" onClick={() => this.setState({formState:false})}>Cancel</Button>
                            <Button rounded outline color="save" type="submit" className={this.state.ideaChanged} >
                                <span className="font-weight-bold">Save</span>
                            </Button>
                        </ModalFooter>
                    </form>
                    )
                    }
                </Modal>
            </Container>
        )
    }
}

export default UpdateIdea;