import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route,withRouter } from 'react-router-dom';
import Home from './components/Home';
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
  }

  loginHandler = () => {
    this.setState({ isLoading: true });
    this.props.history.push("/")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          {
            (this.state.isLoading) ? (
              <div className="m-5">Login...</div>
            ) : (
              <main className="App-main">
                <Route exact path="/" component={Home} isAuthenticated={this.state.isAuthenticated}
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} />
                {/* <Route path="/login"  component={Login} loginHandler={this.loginHandler} />
                <Route path="/signup"  component={Signup} loginHandler={this.loginHandler} /> */}
              </main>
            )
          }
      </div>
    );
  }
}

export default withRouter(App);