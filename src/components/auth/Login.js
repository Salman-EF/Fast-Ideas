import React, { Component } from 'react';
import '../../App.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import { MDBInput,MDBBtn } from "mdbreact";

class Login extends Component {

    render() {
      return (
		    <div className="row justify-content-center m-0">
		        <div className="col-md-4">
              <form className="text-center p-5" method="post" action="/login">
                <p className="h2 mb-5 text-react text-center">Login</p>
              
                <div className="row mt-5">
                  <div className="col-12">
                    {/* Email */}
                    <div className="md-form mb-5">
                      <MDBInput id="email" name="email" type="email" hint="Your Email" className="pl-3" />
                    </div>
                    {/* Pass */}
                    <div className="md-form mb-5">
                      <MDBInput id="password" name="password" type="password" hint="Password" className="pl-3"/>
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
  }
  
  export default Login;