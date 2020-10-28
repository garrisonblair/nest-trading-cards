import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import authService from '../../services/auth-service';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Cards from '../Cards';

const API_URL = "http://localhost:3000/"

export class Profile extends Component {
    state = {
        user: {
            _id: "",
            username: "",
            cards: []
        }
    }

    componentDidMount() {
        const user = authService.getCurrentUser().user;
        if (user) {
            this.setState({ currentUser: user });

            axios.get(`${API_URL}profile`, { headers: authHeader() })
                .then(res => {
                    this.setState({ user: res.data });
                });
        } else {
            this.props.history.push("/login");
        }
    }

    removeCard = (_id) => {
        console.log(`remove card ${_id} from ${this.state.user.username}`)
        // TODO: handle remove card from user deck
    }

    render() {
        const user = this.state.user;

        return (
            <Layout>
                <Layout.Sider>
                    <h2>Username: {user.username}</h2>
                    <h3>Has {user.cards.length} cards in their deck</h3>
                </Layout.Sider>
                <Layout>
                    <Layout.Header>
                        <h1>{user.username}'s cards</h1>
                    </Layout.Header>
                    <Layout.Content>
                        <Cards
                            cards={user.cards}
                            addCard={this.props.addCard}
                            updateCard={this.props.updateCard} 
                            deleteCard={this.props.deleteCard}
                            isAdded={true}
                            removeCard={this.removeCard}
                        />
                    </Layout.Content>
                </Layout>
            </Layout>
        )
    }
}

Profile.propTypes = {
    addCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
}

export default Profile;