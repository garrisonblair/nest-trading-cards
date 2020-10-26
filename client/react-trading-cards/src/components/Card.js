import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Card extends Component {
    getStyle = () => {
        return cardStyle
    }

    render() {
        const { _id, name } = this.props.card

        return (
            <div style={this.getStyle()}>
                <p>
                    <input type="checkbox" onChange={this.props.addCard.bind(this, _id)} />
                    {' '}
                    { name }
                    <button onClick={this.props.deleteCard.bind(this, _id)} style={btnStyle}>x</button>
                </p>
            </div>
        )
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
}

const cardStyle = {
    backgroundColor: '#f4f4f4',
    padding: '5px'
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default Card
