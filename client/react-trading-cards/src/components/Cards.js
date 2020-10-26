import React, { Component } from 'react';
import Card from './Card';
import PropTypes from 'prop-types'

class Cards extends Component {
    
    render() {
        return this.props.cards.map((card) => (
        <Card key={card._id} card={card} addCard={this.props.addCard} deleteCard={this.props.deleteCard} />
        ));
    }
}

Cards.propTypes = {
    cards: PropTypes.array.isRequired,
    addCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
}

export default Cards;
