import React, { Component } from 'react';
import '../../App.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { MDBInput,MDBBtn } from "mdbreact";

class Login extends Component {

  state = {
    email: '',
    password: '',
    invalidEmail: ''
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
      console.log('Email: '+this.state.email)
      console.log('Pass: '+this.state.password)
      this.validateEmail(this.state.email)? (
        // fetch: post login
        console.log('Email valid: '+this.state.email)
      ) : (
        // fetch: post login
        console.log('Email not valid: '+this.state.email)
      )
  }
  render() {
    return (
      <div className="row justify-content-center m-0">
          <div className="col-md-4">
            <form className="text-center p-5" method="post" action="#" onSubmit={this.submitHandler}>
              <p className="h2 mb-5 text-react text-center">Login</p>
            
              <div className="row mt-5">
                <div className="col-12">
                  {/* Email */}
                  <div className="md-form mb-5">
                    <MDBInput id="email" name="email" hint="Your Email" className={this.state.invalidEmail +' pl-3'} 
                              onChange={this.changeHandler} value={this.state.email} />
                  </div>
                  {/* Pass */}
                  <div className="md-form mb-5">
                    <MDBInput id="password" name="password" type="password" hint="Password" className="pl-3"
                              onChange={this.changeHandler} value={this.state.password} />
                  </div>
                  <div className="form-group row justify-content-center">
                      <div className="col-md-8">
                          <MDBBtn type="submit" color="react">Login</MDBBtn>
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
    let EMAIL_FORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(EMAIL_FORMAT)) return true
    return false
  }
}
  
export default Login;