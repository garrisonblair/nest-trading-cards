import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';

const API_URL = "http://localhost:3000/"

export class Profile extends Component {
    state = {
        user: {
            username: ""
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}profile`, { headers: authHeader() })
            .then(res => {
                this.setState({ user: res.data })
            });
      }

    render() {
        return (
            <div>
                <p>Username: </p>
                <p>{this.state.user.username}</p>
            </div>
        )
    }
}

export default Profile;