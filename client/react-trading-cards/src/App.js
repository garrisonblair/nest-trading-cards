import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Axios from 'axios';

import Header from './components/layout/Header';
import Cards from './components/Cards';
import CreateCard from './components/CreateCard';
import About from './components/pages/About';

import './App.css';

class App extends Component {
  state = {
    cards: []
  }

  componentDidMount() {
    Axios.get("http://localhost:3000/cards")
      .then(res => this.setState({ cards: res.data }));
  }

  addCard = (_id) => {
    console.log("add card to deck", _id);
    // TODO: add card to user deck in server
  }

  createCard = (name, description, _class, type, level) => {
    Axios.post("http://localhost:3000/cards", {
      name,
      description,
      class: _class,
      type,
      level
    })
    .then(res => this.setState({ cards: [...this.state.cards, res.data]}));
  }

  deleteCard = (_id) => {
    // TODO: delete card in server
    Axios.delete(`http://localhost:3000/cards/${_id}`)
      .then(res => this.setState({ cards: [...this.state.cards.filter(card => card._id !== _id)]}));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Cards cards={this.state.cards} addCard={this.addCard} deleteCard={this.deleteCard} />
              </React.Fragment>
            )} />
            <Route path="/cards/create" render={(props) => (
              <CreateCard createCard={this.createCard} />
            )}/>
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
