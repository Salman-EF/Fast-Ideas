import React from "react";
import {MDBContainer,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBCardHeader} from "mdbreact";
import Ionicon from 'react-ionicons'

const Ideas = ({ideas, deleteIdea}) => {
    function month_name(dt) {
        let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
          return mlist[dt.getMonth()];
    }
    function day_name(dt) {
        let dlist = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
          return dlist[dt.getDay()];
    }
    function isYesterday(dt) {
        var today = new Date()
        today.setHours(0,0,0,0)
        dt.setHours(0,0,0,0)
        return (today.getTime() - 864e5) === dt.getTime()
    }
    function changeDateFormat(date) {
        let year = date.getFullYear(), month = month_name(date).substr(0,3), day = date.getDate()<10 ? ('0'+date.getDate()):(date.getDate()),
            dayName = day_name(date), hour = date.getHours()
            console.log(hour)
        var dateFormat
        isYesterday(date) ? ( dateFormat = 'Yesterday, '+ dayName +' '+ month +' '+ day +' '+ year ) 
                    : ( dateFormat = dayName +' '+ month +' '+ day +' '+ year )
        return dateFormat
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
                        <p className="card-date">{changeDateFormat(idea.createdAt)}</p>
                        <hr/>
                        <p>
                            {idea.ideaContent}
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