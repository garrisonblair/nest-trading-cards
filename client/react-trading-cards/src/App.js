import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import axios from 'axios';

import Header from './components/layout/Header';
import Cards from './components/Cards';
import CreateCard from './components/CreateCard';
import Profile from './components/pages/Profile';
import Login from './components/login/Login';
import AuthService from './services/auth-service';

import './App.css';

const API_URL = "http://localhost:3000/";

class App extends Component {
  state = {
    cards: [],
    currentUser: undefined
  }

  componentDidMount() {
    axios.get(`${API_URL}cards`)
      .then(res => this.setState({ cards: res.data }));

    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ currentUser: user.user });
    }
  }

  addCard = (_id) => {
    axios.put(`${API_URL}users/${this.state.currentUser.username}/${_id}`)
      .catch(e => {
        console.log('e', e);
        // TODO: handle error
      });
  };

  createCard = (name, description, _class, type, level) => {
    axios.post(`${API_URL}cards`, {
      name,
      description,
      class: _class,
      type,
      level
    })
    .then(res => this.setState({ cards: [...this.state.cards, res.data]}));
    // TODO: handle error
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
    axios.put(`${API_URL}cards/${_id}`, {
      name: name,
      description: description,
      class: _class,
      type: type,
      level: level
    })
    .then(res => this.setState({ cards: this.getUpdatedCardData(_id, res.data)}));
    // TODO: handle error
  }

  deleteCard = (_id) => {
    axios.delete(`${API_URL}cards/${_id}`)
      .then(res => this.setState({ cards: [...this.state.cards.filter(card => card._id !== _id)]}));
      // TODO: handle error
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Cards
                  cards={this.state.cards}
                  addCard={this.addCard}
                  updateCard={this.updateCard}
                  deleteCard={this.deleteCard}
                  isAdded={false}
                />
              </React.Fragment>
            )} />
            <Route path="/cards/create" render={(props) => (
              <CreateCard createCard={this.createCard} />
            )}/>
            <Route path="/profile" render={(props) => (
              <Profile
                addCard={this.addCard}
                updateCard={this.updateCard}
                deleteCard={this.deleteCard}
              />
            )}/>
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
