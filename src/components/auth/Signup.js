import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { MDBInput,MDBBtn } from "mdbreact";
import authServices from './authServices'

class Signup extends Component {

  state = {
    email: '',
    password: '',
    processing: false,
    signupFailed: ''
  }

  changeHandler = (e) => {
    let target = e.target
    if (target.id === 'email') {
      this.validateEmail(target.value) ? (this.setState({invalidEmail:''})):(this.setState({invalidEmail:'invalid'}))
    }
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  submitHandler = (e) => {
      e.preventDefault()
      let email = this.state.email, password = this.state.password, origin=this
      if(this.validateEmail(email) && password) {
        this.setState({ processing:true })
        var thinker = {email:email,password:password}
        fetch("http://localhost:8080/register",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(thinker)
        }).then(response => response.text())
          .then(data => {
            origin.setState({ processing:false })
            if(data === 'error-email') {
              origin.setState({ signupFailed : 'Email used. Please try another!' });
            } else {
              localStorage.setItem('ACCESS_TOKEN', data)
              origin.props.loginHandler()
              authServices.login()
            }
        })
      }
  }
  render() {
    return (
      <div className="row justify-content-center m-0">
          <div className="col-md-4">
            <form className="text-center p-5" method="post" action="#" onSubmit={this.submitHandler}>
              <div className="row">
                <div className="col-12">
                  {/* Email */}
                  <div className="md-form mb-5">
                    <MDBInput id="email" name="email" hint="Your Email" className={this.state.invalidEmail +' text-center'} 
                              onChange={this.changeHandler} value={this.state.email} required />
                  </div>
                  {/* Pass */}
                  <div className="md-form mb-5">
                    <MDBInput id="password" name="password" type="password" hint="Password" className="text-center"
                              onChange={this.changeHandler} value={this.state.password} required />
                  </div>
                  <p className="red-text text-center">{this.state.signupFailed}</p>
                  <div className="form-group row justify-content-center">
                      <div className="col-md-8">
                        {
                          this.state.processing ? (
                            <MDBBtn className="disabled" color="react">Submiting</MDBBtn>
                          ) : (
                            <MDBBtn type="submit" color="react">Signup</MDBBtn>
                          )
                        }
                      </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
      </div>
    );
  }

  validateEmail(email) {
    let EMAIL_FORMAT = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(EMAIL_FORMAT)) return true
    return false
  }
}
  
export default withRouter(Signup);