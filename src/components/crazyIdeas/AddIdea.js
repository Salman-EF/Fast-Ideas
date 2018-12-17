import React, { Component } from 'react';
import { MDBInput, MDBBtn } from "mdbreact";

class AddIdea extends Component {
    state = {
        idea: {
            id: null,
            title: '',
            content: '',
            created_at: null,
            thinker: {
                id: null
            }
        },
        active: 'disabled'
    }
    changeHandler = (e) => {
        let target = e.target
        if (target.id==='title' && target.value!=null && target.value!=='') {this.setState({ active: '' })}
        else if(target.id==='content') {} else {this.setState({ active: 'disabled' })}

        let idea = {...this.state.idea}
        idea[target.id] = target.value
        this.setState({idea})
    }
    submitHandler = (e) => {
        e.preventDefault()
        let title = this.state.idea.title
        if (title!=null && title!=='') {
            this.addIdea(this.state.idea)
            this.initializeState()
        }
    }
    addIdea = (idea) => {
      idea.created_at = new Date();
      fetch('http://localhost:8080/ideas',{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idea)
      }).then(response => response.json())
        .then( data => this.props.updateIdeas([...this.props.ideas, data]))
        
      return idea
    }
    initializeState = () => {
        this.setState({
            idea: { id: null,title: '',content: '',created_at: null },
            active: 'disabled'
        })
    }
    
    render() {
        return (
            <div id="newIdeaSection" className="col-md-8 mx-auto my-5 py-3">
                <form onSubmit={this.submitHandler}>
                <div className="md-form">
                    <MDBInput id="title" hint="Idea title" className="text-center"
                            onChange={this.changeHandler} value={this.state.idea.title} />
                    <MDBInput id="content" type="textarea" rows="5" hint="So What's your Crazy Idea..." className="mb-0"
                            onChange={this.changeHandler} value={this.state.idea.content} />
                    <MDBBtn rounded outline color="save" type="submit" className={this.state.active} >
                        <span className="font-weight-bold">Save</span>
                    </MDBBtn>
                </div>
                </form>
            </div>
        )   
    }
}

export default AddIdea