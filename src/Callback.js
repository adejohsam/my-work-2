import React, { Component } from 'react';

class Callback extends Component {
    componentDidMount() {
        // handle authentication if Expected values are in the Url
        if (/acess_token|id_token|error/.test(this.props.location.hash)){
            this.props.auth.HandleAuthentication();
        } else
        throw new Error("Invalid Callbasck Url.")
    }
    render() {
        return (
            <h1>
              loading........   
            </h1>
        );
    }
}

export default Callback;