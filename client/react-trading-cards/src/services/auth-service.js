import axios from 'axios';

const API_URL = "http://localhost:3000/";

class AuthService {
    login(username, password) {
        return axios.post(`${API_URL}auth/login`, {
            username,
            password
        })
        .then(response => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, password) {
        return axios.post(`${API_URL}users/register`, {
            username,
            password
        });
    }
    
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();