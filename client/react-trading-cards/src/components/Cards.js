import React, { Component } from 'react';
import Card from './Card';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types'
import 'antd/dist/antd.css';


class Cards extends Component {
    
    render() {
        return (
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                {this.props.cards.map((card) =>
                    <Col span={8} key={card._id}>
                        <Card card={card} addCard={this.props.addCard} updateCard={this.props.updateCard} deleteCard={this.props.deleteCard} />
                    </Col>
                )}
            </Row>
        )
    }
}

Cards.propTypes = {
    cards: PropTypes.array.isRequired,
    addCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
}

export default Cards;
