import React from "react";
import Moment from "moment"
import {MDBContainer,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBCardHeader} from "mdbreact";
import Ionicon from 'react-ionicons'

const Ideas = ({ideas, updateIdeas}) => {
    function changeDateFormat(date) {
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
    function deleteIdea(id) {
        let deletingStatus = false
        fetch("http://localhost:8080/ideas/"+id, {
            method: "DELETE"
        }).then(response => response.json())
        .then( function(data) {
            deletingStatus = data
            if(deletingStatus) {
                let listUpdated = ideas.filter(idea => {
                    return idea.id !== id
                })
                updateIdeas(listUpdated)
            }
        })
    }
    
    const ideasList = ideas.length ? (
        ideas.map(idea => {
            return (
                <MDBCol md="4" className="my-2" key={idea.id}>
                    <MDBCard className="card-react">
                        <div className="card-header-delete" >
                            <Ionicon icon="md-close" className="card-delete-icon" onClick={() => deleteIdea(idea.id)} />
                        </div>
                        <MDBCardHeader>
                            <h4>{idea.title}</h4>
                        </MDBCardHeader>
                        <MDBCardBody>
                        <p className="card-date">{changeDateFormat(idea.created_at)}</p>
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
        <div className="row py-3">
            <h3>You better Write something</h3>
        </div>
    )

    return (
        <MDBContainer id="displayIdeasSection">
            <MDBRow className="justify-content-center">
                {ideasList}
            </MDBRow>
        </MDBContainer>
    )
}

export default Ideas