import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard, Modal, Form, Input, Button, Select, InputNumber } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export class Card extends Component {
    state = {
        name: this.props.card.name,
        description: this.props.card.description,
        class: this.props.card.class,
        type: this.props.card.type,
        level: this.props.card.level,
        loading: false,
        visible: false,
        changesMade: false
    };

    get initialState() {
        return {
            name: this.props.card.name,
            description: this.props.card.description,
            class: this.props.card.class,
            type: this.props.card.type,
            level: this.props.card.level,
            loading: false,
            visible: false,
            changesMade: false
        }
    }

    showModal = () => this.setState({ visible: true });
    
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({changesMade: true});
    }

    onChangeLevel = (level) => {
        this.setState({level: level, changesMade: true});
    }

    handleOk = () => {
        this.setState({ loading: true });
        if (this.state.changesMade) {
            this.props.updateCard(
                this.props.card._id,
                this.state.name,
                this.state.description,
                this.state.class,
                this.state.type,
                this.state.level
            )
            this.setState({ changesMade: false, loading: false, visible: false});
        } else {
            this.setState({ visible: false }); 
        }
    };

    handleCancel = () => this.setState(this.initialState);  

    render() {
        const {
            _id,
            name,
            description,
            type,
            level
        } = this.props.card;
        const cardClass = this.props.card.class

        return (
            <AntCard 
                title={name}
                actions={[
                    <DeleteOutlined key="delete" onClick={this.props.deleteCard.bind(this, _id)} />,
                    <EditOutlined key="edit" onClick={this.showModal} />,
                    <PlusOutlined key="add" onClick={this.props.addCard.bind(this, _id)} />
                ]}
                style={{ width: 250 }}
            >
                <p>Description: {description}</p>
                <p>Class: {cardClass}</p>
                <p>Type: {type}</p>
                <p>Level: {level}</p>
                <Modal
                    visible={this.state.visible}
                    title="Edit Card"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={this.loading} onClick={this.handleOk}>
                          Save
                        </Button>,
                      ]}
                    >
                    <Form>
                        <Form.Item label="Name">
                            <Input name="name" value={this.state.name} defaultValue={this.state.name} onChange={this.onChange}/>
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input name="description" value={this.state.description} defaultValue={this.state.description} onChange={this.onChange}/>
                        </Form.Item>
                        <Form.Item label="Class">
                            <Select defaultValue={this.state.class}>
                                <Select.Option name="class" onChange={this.onChange} value="Hero">Hero</Select.Option>
                                <Select.Option name="class" onChange={this.onChange} value="Medic">Medic</Select.Option>
                                <Select.Option name="class" onChange={this.onChange} value="Morale Boost">Morale Boost</Select.Option>
                                <Select.Option name="class" onChange={this.onChange} value="Muster">Muster</Select.Option>
                                <Select.Option name="class" onChange={this.onChange} value="Spy">Spy</Select.Option>
                                <Select.Option name="class" onChange={this.onChange} value="Tight Bond">Tight Bond</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Type">
                            <Select defaultValue={this.state.type}>
                                <Select.Option name="type" onChange={this.onChange} value="close">Close Combat</Select.Option>
                                <Select.Option name="type" onChange={this.onChange} value="ranged">Ranged Combat</Select.Option>
                                <Select.Option name="type" onChange={this.onChange} value="siege">Siege</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <InputNumber name="level" min={0} max={10} defaultValue={this.state.level} onChange={this.onChangeLevel} />
                        </Form.Item>
                    </Form>
                </Modal>
            </AntCard>
        )
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
}

export default Card
