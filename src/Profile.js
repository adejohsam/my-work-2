import React, { Component } from 'react';

class Profile extends Component {
    state = {
     Profile: null,
     error: ""
    };


    componentDidMount() {
        this.loaduserProfile();
    }

    loaduserProfile() {
     this.props.auth.getProfile((profile,error)=>
     this.setState({profile,error})
     );
    }


    render() {
        const {profile} = this.state;
        if (!profile) return null;
        return <>
            <h1>Profile</h1>
            <p>profile.neckname</p>
            <img style={{maxWidth: 50, maxHeight: 50,}}
            scr={profile.picture} 
            alt="profile pic" 
            />
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            
                
        </>;
    }
}

export default Profile;