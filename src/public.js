import React, { Component } from 'react';
import { findByPlaceholderText } from '@testing-library/react';
import { response } from 'express';

class Public extends Component {
    state = {

    message: ""

    }
    componentDidMount() {
        fetch('/public'). then(response =>  {
            if (response.ok) return response.json();
            throw new Error("Network response was ok.");
        })
        .then(response => this.setState({message: response.message}))
        .catch(error => this.setState({message:error.message}));
    }
    render() {
    return <p>{this.state.message}</p>;
        
    }
}

export default Public;