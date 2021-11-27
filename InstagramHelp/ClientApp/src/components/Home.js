import React, { Component } from 'react';
import './Home.css';
import { Loader } from './Loader';

export class Home extends Component {
  static displayName = Home.name;
  chosenColour = '#262626';
  notChosenColour = '#8e8e8e';
  chosenClass = 'T-jvg';

    componentDidMount = async(props) => {
        document.title = "Страница";
        
        await this.fetchUserData();
    }
    
    constructor(props) {
        super(props);
        this.state = {
            fetchedUserData: false,
            userName: '',
            fullName: '',
            followersAmount: 0,
            followingAmount: 0,
            userMediaAmount: 0,
            nonMutualSubscriptions: false,
            nonMutualSubscriptionsClass: '',
            nonMutualSubscriptionsColour: this.notChosenColour
        };

        this.nonMutualSubscriptionsChoose = this.nonMutualSubscriptionsChoose.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
    }
    
    nonMutualSubscriptionsChoose()
    {
        this.setState({
            nonMutualSubscriptions: true,
            nonMutualSubscriptionsClass: this.chosenClass,
            nonMutualSubscriptionsColour: this.chosenColour
        });
    }
    
    async fetchUserData() {
        const settings = {
            method: 'GET'
        };
        const fetchResponse = await fetch('api/account/userData', settings);
        const data = await fetchResponse.json();
        
        if(fetchResponse.status === 200)
        {
            this.setState({
                fetchedUserData: true,
                userName: data.userName,
                fullName: data.fullName,
                followersAmount: data.followersAmount,
                followingAmount: data.followingAmount,
                userMediaAmount: data.userMediaAmount
            });
        }
    }

    render () {
        if(!this.state.fetchedUserData)
        {
            return (<main className="SCxLW  o64aR flex_column" role="main">
                <Loader/>
                </main>);
        }

        return (
            <main className="SCxLW  o64aR flex_column" role="main">
                <div className="v9tJq AAaSh flex_column">
                    <header className="vtbgv flex_column">
                        <div className="XjzKX">
                            <div className="_4dMfM">
                                <div className="M-jxE">
                                    <img
                                        alt="Изменить фото профиля" className="be6sR"
                                        src={"account/photos/" + this.state.userName + ".png"}/>
                                </div>
                            </div>
                        </div>
                        <section className="zwlfE">
                            <div className="nZSzR"><h2
                                className="_7UhW9       fKFbl yUEEX   KV-D4              fDxYl     ">{this.state.userName}</h2>
                            </div>
                            <ul className="k9GMp ">
                                <li className="Y8-fY "><span className="-nal3 "><span className="g47SY ">{this.state.userMediaAmount}</span> публикаций</span>
                                </li>
                                <li className="Y8-fY "><label className="-nal3 " tabIndex="0"><span
                                    className="g47SY " >{this.state.followersAmount}</span> подписчиков</label></li>
                                <li className="Y8-fY "><label className="-nal3 " tabIndex="0"><span
                                    className="g47SY ">{this.state.followingAmount}</span> подписок</label></li>
                            </ul>
                            <div className="-vDIg"><h1 className="rhpdm">{this.state.fullName}</h1><br/></div>
                        </section>
                    </header>
                    <div className="fx7hk" role="tablist"><a className={"_9VEo1 " + this.state.nonMutualSubscriptionsClass} role="tab"
                                                             href="#" tabIndex="0"><span className="smsjF" onClick={this.nonMutualSubscriptionsChoose}><svg className="_8-yf5 " color={this.state.nonMutualSubscriptionsColour} fill={this.state.nonMutualSubscriptionsColour} height="12"
                                                                                                                                                            role="img" viewBox="0 0 48 48" width="12"><path
                        d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path></svg><span
                        className="PJXu4">Невзаимные подписки</span></span></a>
                    </div>
                </div>
            </main>
        );
    }
}
