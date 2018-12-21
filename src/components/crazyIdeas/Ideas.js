import React,{ Component } from "react";
import Moment from "moment"
import {MDBContainer,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBCardHeader} from "mdbreact";
import Ionicon from 'react-ionicons'
import UpdateIdea from './UpdateIdea';

class Ideas extends Component {
    
    state = {
        ideas: this.props.ideas,
        ModalOpen: false,
        ideaToUpdate: {}
    };
    componentDidUpdate(prevProps) {
        // compare props to not cause an infinite loop:
        if (this.props.ideas !== prevProps.ideas) {
            this.setState({
                ideas: this.props.ideas
            })
            this.toggleUpdateModal()
        }
    }

    changeDateFormat(date) {
        let givenMoment = Moment(date),
            dateFormat = givenMoment.format('MMMM DD, YYYY') +' at '+givenMoment.format('hh:mm A')
        if(Moment().year()===givenMoment.year()) {
            dateFormat = givenMoment.format('MMMM DD') +' at '+givenMoment.format('hh:mm A')
        }
        if(Moment().diff(givenMoment, 'days') <= 1) {
            dateFormat = givenMoment.calendar(Moment())
        }
        if(Moment().diff(givenMoment, 'hours') <= 2) {
            if(givenMoment.fromNow(true).includes('second'))dateFormat=givenMoment.fromNow(true).replace('second','sec')
            if(givenMoment.fromNow(true).includes('minute'))dateFormat=givenMoment.fromNow(true).replace('minute','min')
            if(givenMoment.fromNow(true).includes('hour'))dateFormat=givenMoment.fromNow(true)
            dateFormat = dateFormat.replace('a ','')
        }
        return dateFormat
    }
    deleteIdea(id) {
        fetch("http://localhost:8080/ideas/"+id, {
            method: "DELETE"
        }).then(response => response.json())
        .then( data => {
            if(data) {
                let listUpdated = this.state.ideas.filter(idea => {
                    return idea.id !== id
                })
                this.props.refreshIdeas(listUpdated)
            }
        })
    }
    showUpdateModal = (idea) => {
        this.setState({
            ideaToUpdate: {...idea},
            ModalOpen: true
        })
    }
    toggleUpdateModal = () => {
        this.setState({
            ModalOpen: false
        })
    }

    render() {
        return (
            <MDBContainer id="displayIdeasSection">
                <MDBRow className="justify-content-center">
                {
                this.state.ideas.length ? (
                    this.state.ideas.map(idea => {
                        return (
                            <MDBCol md="4" className="my-2" key={idea.id}>
                            <MDBCard className="card-react" onClick={() => this.showUpdateModal(idea)} >
                                <div className="card-header-icons" >
                                    <Ionicon icon="md-close" className="card-icons card-delete-icon card-icons-onhover"
                                                onClick={() => this.deleteIdea(idea.id)} />
                                </div>
                                <MDBCardHeader>
                                    <h4>{idea.title}</h4>
                                </MDBCardHeader>
                                <MDBCardBody>
                                <p className="card-date">{this.changeDateFormat(idea.created_at)}</p>
                                <hr/>
                                <p>
                                    {idea.content}
                                </p>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                        )
                        })
                        ) : (
                            <MDBRow className="py-3">
                                <h3>You better Write something</h3>
                            </MDBRow>
                        )
                }
                <UpdateIdea isOpen={this.state.ModalOpen} toggle={this.toggleUpdateModal}
                            idea={this.state.ideaToUpdate} ideas={this.state.ideas} refreshIdeas={this.props.refreshIdeas} />
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Ideas