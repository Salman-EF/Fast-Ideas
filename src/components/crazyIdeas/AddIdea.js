import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { MDBInput, MDBBtn } from "mdbreact";

class AddIdea extends Component {
    state = {
        idea: {
            id: null,
            title: '',
            ideaContent: '',
            createdAt: null
        },
        active: 'disabled'
    }
    changeHandler = (e) => {
        let target = e.target
        if (target.id==='title' && target.value!=null && target.value!=='') {this.setState({ active: '' })}
        else if(target.id==='ideaContent') {} else {this.setState({ active: 'disabled' })}

        let idea = {...this.state.idea}
        idea[target.id] = target.value
        this.setState({idea})
    }
    submitHandler = (e) => {
        e.preventDefault()
        let title = this.state.idea.title
        if (title!=null && title!=='') {
            let ideaId = this.props.addIdea(this.state.idea).id
            /* ReactDOM.findDOMNode(this.refs[ideaId]).focus(); */
            console.log(this.refs.ideaCol)
            this.initializeState()
        }
    }
    initializeState = () => {
        this.setState({
            idea: { id: null,title: '',ideaContent: '',createdAt: null },
            active: 'disabled'
        })
    }
    
    render() {
        return (
            <div className="col-md-8 mx-auto my-5 py-3">
                <form onSubmit={this.submitHandler}>
                <div className="md-form">
                    <MDBInput id="title" hint="Idea title" className="text-center"
                            onChange={this.changeHandler} value={this.state.idea.title} />
                    <MDBInput id="ideaContent" type="textarea" rows="5" hint="So What's your Crazy Idea..." className="mb-0"
                            onChange={this.changeHandler} value={this.state.idea.ideaContent} />
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