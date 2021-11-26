import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';

import './custom.css'
import {Login} from "./components/Login";
import {Redirect} from "react-router-dom";

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: null
        };

        this.isAuthorized = this.isAuthorized.bind(this);
    }

    componentDidMount = async() => {
        await this.isAuthorized();
    }

    async isAuthorized()
    {
        const settings = {
            method: 'GET'
        };
        const fetchResponse = await fetch('api/auth/isAuthorized', settings);
        const data = await fetchResponse.json();

        this.setState({
            isLoggedIn: data
        });
    }


    render () {
        if(this.state.isLoggedIn === null)
        {
            return <Layout/>
        }
        return (
            <Layout>
                <Route exact path='/' render={() => (
                    this.state.isLoggedIn ? <Home/> : <Redirect to="/login" />
                )}/>
                <Route exact path='/login' render={() => (
                    this.state.isLoggedIn ? <Redirect to="/"/> : <Login authCheck={this.isAuthorized}/>
                )}/>
                <Route exact path='/fetch-data' render={() => (
                    this.state.isLoggedIn? <FetchData/> : <Redirect to="/login" />
                )} />
            </Layout>
        );
    }
}
