import React, { Component } from 'react';
import AuthService from "../../services/auth-service";
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone  } from '@ant-design/icons';

export class Login extends Component {
    state = {
        username: "",
        password: "",
        loading: false,
        message: ""
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleLogin = (e) => {
        e.preventDefault();
    
        this.setState({
            loading: true,
            message: ""
        });
    
        if (this.state.password.length !== 0) {
            AuthService.login(this.state.username, this.state.password)
                .then(
                    () => {
                        this.props.history.push("/profile");
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                
                        this.setState({
                            loading: false,
                            message: resMessage
                        });
                    }
                );
            } else {
                this.setState({
                    loading: false
                });
            }
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <Form>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username',
                            },
                        ]}
                    > 
                        <Input placeholder="input username" name="username" onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                    >         
                        <Input.Password
                            placeholder="input password"
                            name="password"
                            value={this.state.password}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={this.onChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.handleLogin}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    };
}

export default Login