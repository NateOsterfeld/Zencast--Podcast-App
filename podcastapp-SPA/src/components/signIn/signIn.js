import React from 'react';
import './signIn.scss';
import { auth } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });
            console.log('user', user);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
}

export default SignIn;