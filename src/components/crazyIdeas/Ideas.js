import React from "react";
import {MDBContainer,MDBCard,MDBCardBody,MDBRow,MDBCol,MDBCardHeader} from "mdbreact";
import Ionicon from 'react-ionicons'

const Ideas = ({ideas, deleteIdea}) => {
    function month_name(dt) {
        let mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
          return mlist[dt.getMonth()];
    }
    function changeDateFormat(date) {
        let year = date.getFullYear(), month = month_name(date), day = date.getDate()<10 ? ('0'+date.getDate()):(date.getDate())
        return day +' '+ month +' '+ year
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
        <MDBContainer>
            <MDBRow className="justify-content-center">
                {ideasList}
            </MDBRow>
        </MDBContainer>
    )
}

export default Ideas