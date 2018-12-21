import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import Ideas from './components/crazyIdeas/Ideas';
import AddIdea from './components/crazyIdeas/AddIdea';

class App extends Component {
  state = {
    ideas : [],
    isLoading : false
  };
  componentDidMount = () => {
    this.setState({isLoading: true});
  
    fetch('http://localhost:8080/ideas')
      .then(response => response.json())
      .then(data => this.setState({ideas: data, isLoading: false}));
  }
  refreshIdeas = (ideas) => {
    this.setState({ideas})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main className="App-main">
            <div className="container mt-3 mb-5">
              <AddIdea ideas={this.state.ideas} refreshIdeas={this.refreshIdeas} />
              {/* Print Loading... till data fetched */}
              {this.state.isLoading ? (
                <div className="container">
                    <h3>Loading...</h3>
                </div>
              ) : (
                <Ideas ideas={this.state.ideas} refreshIdeas={this.refreshIdeas} />
              )}
            </div>
        </main>
      </div>
    );
  }
}

export default App;