import React, { Component } from 'react';
import {NonMutualSubscriber} from "./NonMutualSubscriber";
import './NonMutualSubscriptions.css';
import {Loader} from "./Loader";

export class NonMutualSubscriptions extends Component {
    static displayName = NonMutualSubscriptions.name;


    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            users: null
        };

        this.fetchNonMutualSubscriptions = this.fetchNonMutualSubscriptions.bind(this);
    }
    
    componentDidMount = async(props) => {
        await this.fetchNonMutualSubscriptions();
    }

    async fetchNonMutualSubscriptions() {
        const settings = {
            method: 'GET'
        };
        const fetchResponse = await fetch('api/account/getNonMutualSubscriptions', settings);
        const data = await fetchResponse.json();

        if(fetchResponse.status === 200)
        {
            this.setState({
                isLoaded: true,
                users: data
            });
        }
    }
    
    render() {
        if(!this.state.isLoaded)
        {
            return (<main className="SCxLW  o64aR flex_column" role="main">
                <Loader/>
            </main>);
        }

        const subscribersList = this.state.users.map((user) =>
            <NonMutualSubscriber key={user.id} userId={user.id} userName={user.userName} fullName={user.fullName} />
        );
        
        return (
            <div className="_1XyCr  ">
                <div className="isgrP">
                    <ul className="jSC57  _6xe7A">
                        <div className="PZuss">
                            {subscribersList}
                        </div>
                    </ul>
                    <div className="oMwYe"></div>
                </div>
            </div>
        );
    }
}
