import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import authService from '../../services/auth-service';

const API_URL = "http://localhost:3000/"

export class Profile extends Component {
    state = {
        user: {
            username: ""
        }
    }

    componentDidMount() {
        const user = authService.getCurrentUser().user;
        if (user) {
            this.setState({ currentUser: user });

            axios.get(`${API_URL}profile`, { headers: authHeader() })
                .then(res => {
                    this.setState({ user: res.data })
                });
        } else {
            this.props.history.push("/login");
        }
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