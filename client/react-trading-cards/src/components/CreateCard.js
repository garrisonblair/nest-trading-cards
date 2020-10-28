import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import 'antd/dist/antd.css';

export class CreateCard extends Component {
    state = {
        name: '',
        description: '',
        class: '',
        type: '',
        level: 0
    };

    get initialState() {
        return {
            name: '',
            description: '',
            class: '',
            type: '',
            level: 0
        }
    }

    resetForm = () => this.setState(this.initialState);

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onChangeClass = (_class) => this.setState({class: _class, changesMade: true});

    onChangeType = (type) => this.setState({type: type, changesMade: true});

    onChangeLevel = (level) => this.setState({level});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createCard(
            this.state.name,
            this.state.description,
            this.state.class,
            this.state.type,
            this.state.level
        );
        this.resetForm();
    }

    render() {
        return (
            <Form>
                <Form.Item label="Name">
                    <Input name="name" value={this.state.name} placeholder="Card name..." onChange={this.onChange}/>
                </Form.Item>
                <Form.Item label="Description">
                    <Input name="description" value={this.state.description} placeholder="Card descriptiion..." onChange={this.onChange}/>
                </Form.Item>
                <Form.Item label="Class">
                    <Select onChange={this.onChangeClass} defaultValue={this.state.class}>
                        <Select.Option name="class" value="Hero">Hero</Select.Option>
                        <Select.Option name="class" value="Medic">Medic</Select.Option>
                        <Select.Option name="class" value="Morale Boost">Morale Boost</Select.Option>
                        <Select.Option name="class" value="Muster">Muster</Select.Option>
                        <Select.Option name="class" value="Spy">Spy</Select.Option>
                        <Select.Option name="class" value="Tight Bond">Tight Bond</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Type">
                    <Select onChange={this.onChangeType} defaultValue={this.state.type}>
                        <Select.Option name="type" value="close">Close Combat</Select.Option>
                        <Select.Option name="type" value="ranged">Ranged Combat</Select.Option>
                        <Select.Option name="type" value="siege">Siege</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <InputNumber name="level" min={0} max={10} defaultValue={0} onChange={this.onChangeLevel} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={this.resetForm}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

CreateCard.propTypes = {
    createCard: PropTypes.func.isRequired,
}

export default CreateCard
