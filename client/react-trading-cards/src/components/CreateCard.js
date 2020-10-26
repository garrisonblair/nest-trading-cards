import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CreateCard extends Component {
    state = {
        name: '',
        description: '',
        class: '',
        type: '',
        level: 0
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createCard(
            this.state.name,
            this.state.description,
            this.state.class,
            this.state.type,
            this.state.level
        );
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit } style={{ display: "flex" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Card name..."
                    style={{ flex: '10', padding: '5px' }}
                    value={ this.state.name }
                    onChange={ this.onChange }
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Create description..."
                    style={{ flex: '10', padding: '5px' }}
                    value={ this.state.description }
                    onChange={ this.onChange }
                />
                <label>
                    Select a class:
                    <select name="class" value={this.state.class} onChange={this.onChange}>
                        <option value="" />
                        <option value="hero">Hero</option>
                        <option value="medic">Medic</option>
                        <option value="morale_boost">Morale Boost</option>
                        <option value="muster">Muster</option>
                        <option value="spy">Spy</option>
                        <option value="tight_bond">Tight Bond</option>
                    </select>
                </label>
                <label>
                    Select a type:
                    <select name="type" value={this.state.type} onChange={this.onChange}>
                        <option value="" />
                        <option value="close">Close Combat</option>
                        <option value="ranged">Ranged Combat</option>
                        <option value="siege">Siege</option>
                    </select>
                </label>
                <label>
                    Select a Level
                    <select name="level" value={this.state.level} onChange={this.onChange}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </label>
                <input
                    type="submit"
                    value="submit"
                    className="btn"
                    style={{ flex: '1' }}
                />
            </form>
        );
    }
}

CreateCard.propTypes = {
    createCard: PropTypes.func.isRequired,
}

export default CreateCard
