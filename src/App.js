import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main className="App-main">
          
        </main>
      </div>
    );
  }
}

export default App;