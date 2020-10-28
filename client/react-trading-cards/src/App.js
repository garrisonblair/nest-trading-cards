import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Axios from 'axios';

import Header from './components/layout/Header';
import Cards from './components/Cards';
import CreateCard from './components/CreateCard';
import About from './components/pages/About';

import './App.css';

const API_URL = "http://localhost:3000/";

class App extends Component {
  state = {
    cards: []
  }

  componentDidMount() {
    Axios.get(`${API_URL}cards`)
      .then(res => this.setState({ cards: res.data }));
  }

  addCard = (_id) => {
    console.log("add card to deck", _id);
    // TODO: add card to user deck in server
  }

  createCard = (name, description, _class, type, level) => {
    Axios.post(`${API_URL}cards`, {
      name,
      description,
      class: _class,
      type,
      level
    })
    .then(res => this.setState({ cards: [...this.state.cards, res.data]}));
  }

  getUpdatedCardData = (_id, resData) => {
      var update = require('immutability-helper');
      var cardIndex = this.state.cards.findIndex(function(c) { 
        return c._id === _id; 
      });
      var newCardData = update(this.state.cards, {
        $splice: [[cardIndex, 1, resData]]
      });
      return newCardData;
  }

  updateCard = (_id, name, description, _class, type, level) => {
    Axios.put(`${API_URL}cards/${_id}`, {
      name: name,
      description: description,
      class: _class,
      type: type,
      level: level
    })
    .then(res => this.setState({ cards: this.getUpdatedCardData(_id, res.data)}))
  }

  deleteCard = (_id) => {
    // TODO: delete card in server
    Axios.delete(`${API_URL}cards/${_id}`)
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
                <Cards cards={this.state.cards} addCard={this.addCard} updateCard={this.updateCard} deleteCard={this.deleteCard} />
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
