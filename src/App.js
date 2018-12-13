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
    ideas : [
      {id:1, title:"SadFad", ideaContent:"I have to forget that coding is a competition and just have fun like I was doing at the beginning", createdAt: new Date('2018,12,06')},
      {id:2, title:"SadFad", ideaContent:"My website is my face", createdAt: new Date('2018,12,10')},
      {id:3, title:"SadFad", ideaContent:"Sit down...be humble!!", createdAt: new Date('2018,12,08')},
    ]
  };
  addIdea = (idea) => {
    idea.id = Math.random();
    idea.createdAt = new Date();
    let ideas = [...this.state.ideas, idea];
    this.setState({
      ideas
    });
    return idea
  }
  deleteIdea = (id) => {
    let ideas = this.state.ideas.filter(idea => {
      return idea.id !== id
    })
    this.setState({
      ideas
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main className="App-main">
          <div className="container mt-3 mb-5">
            <AddIdea addIdea={this.addIdea} />
            <Ideas ideas={this.state.ideas} deleteIdea={this.deleteIdea} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;