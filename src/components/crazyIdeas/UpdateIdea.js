import  React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBInput } from 'mdbreact';
import Ionicon from 'react-ionicons'
import '../../modal-script';

class UpdateIdea extends Component {
    state = {
        oldIdea:  this.props.idea,
        idea: this.props.idea,
        ideas: this.props.ideas,
        formState: false,
        ideaChanged: 'disabled'
    }
    componentDidUpdate(prevProps){
        if(this.props.idea !== prevProps.idea) {
            this.setState({
                oldIdea: this.props.idea,
                idea: this.props.idea,
                ideas: this.props.ideas
            })
        }
    }
    toggle = () => {
        this.props.toggle()
        this.setState({formState:false})
    }
    changeHandler = (e) => {
        let target = e.target
        if ((target.id==='title' && target.value!=null && target.value!=='') || target.id==='content') {
            this.setState({ ideaChanged: '' })
        } else {this.setState({ ideaChanged: 'disabled' })}

        let idea = {...this.state.idea}
        idea[target.id] = target.value
        this.setState({idea})
    }
    cancelHandler = () => {
        this.setState({
            idea: this.state.oldIdea,
            formState:false,
            ideaChanged: 'disabled'
        })
    }
    submitHandler = (e) => {
        e.preventDefault()
        let ideaChanged = this.state.ideaChanged, ideaUpdated = this.state.idea, origin = this
        if (ideaChanged==='') {
            fetch('http://localhost:8080/ideas/'+ideaUpdated.id,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ideaUpdated)
            }).then(response => response.json())
            .then(function(data){
                if (data!=='' && data!==null) {
                    origin.setState({
                        formState: false,
                        ideaChanged: 'disabled',
                        oldIdea: ideaUpdated,
                    })
                    let listUpdated = origin.state.ideas.map(idea => {
                        if(idea.id===ideaUpdated.id) return ideaUpdated
                        return idea
                    })
                    origin.props.refreshIdeas(listUpdated)
                }
            })
        }
    }

    render() {
        return (
            <Container>
                <Modal id="updateModal" isOpen={this.props.isOpen} toggle={() => null} centered>
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
                            <Button color="#FFF" className="btn-link" onClick={this.cancelHandler}>Cancel</Button>
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