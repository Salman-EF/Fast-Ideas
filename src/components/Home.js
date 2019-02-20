import React, { Component } from 'react';
import '../App.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import Ideas from './crazyIdeas/Ideas';
import AddIdea from './crazyIdeas/AddIdea';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas : [],
      isLoading : false
    };
  }
  componentDidMount = () => {
    this.setState({isLoading: true});
    let origin = this
    fetch('http://localhost:8080/ideas',{
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        origin.setState({ideas: data, isLoading: false})});
  }
  componentDidUpdate = (prevProps) => {
    if(this.props !== prevProps) {
      this.setState({isLoading: true})
      let origin = this
      fetch('http://localhost:8080/ideas',{
        method: "GET"
      }).then(response => response.json())
        .then(data => origin.setState({ideas: data, isLoading: false}));
    }
  }
  refreshIdeas = (ideas) => {
    this.setState({ideas})
  }

  render() {
    return (
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
    );
  }
}

export default Home;