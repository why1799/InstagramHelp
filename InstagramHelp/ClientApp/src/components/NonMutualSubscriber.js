import React, { Component } from 'react';

import './NonMutualSubscriber.css';
import {SmallLoader} from "./SmallLoader";


export class NonMutualSubscriber extends Component {
    static displayName = NonMutualSubscriber.name;

    constructor(props) {
        super(props);
        this.state = {
            subscribed: true,
            loading: false,
            disable: false,
            button_class: 'L3NKy2 _8A5w52 button_90',
            button_text: 'Подписки',
            loading_colour: '#555555'
        };

        this.buttonClick = this.buttonClick.bind(this);
    }

    async buttonClick()
    {
        this.setState({
            disable: true,
            loading: true,
        });

        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserId: this.props.userId
            })
        };
        
        if(this.state.subscribed)
        {
            const fetchResponse = await fetch('api/account/unSubscribeFromUser', settings);

            this.setState({
                subscribed: false,
                button_class: 'L3NKy3 y3zKF button_112',
                button_text: 'Подписаться',
                loading_colour: '#fafafa'
            });
        }
        else
        {
            const fetchResponse = await fetch('api/account/subscribeOnUser', settings);
            
            this.setState({
                subscribed: true,
                button_class: 'L3NKy2 _8A5w52 button_90',
                button_text: 'Подписки',
                loading_colour: '#555555'
            });
        }

        this.setState({
            disable: false,
            loading: false,
        });
    }

    render() {
        return (
        <li className="wo9IH">
            <div className="uu6c_ flex_column">
                <div className="t2ksc">
                    <div className="Jv7Aj mArmR   pZp3x">
                        <div className="RR-M-  SAvC5" aria-disabled="true" role="button" tabIndex="-1">
                            <canvas className="CfWVH" height="40" width="40"
                                   ></canvas>
                            <a className="_2dbep qNELH kIKUG" href={"https://www.instagram.com/" + this.props.userName} tabIndex="0"
                               ><img alt={"Фото профиля " + this.props.userName}
                                                                                       className="_6q-tv"
                                                                                       crossOrigin="anonymous"
                                                                                       data-testid="user-avatar"
                                                                                       draggable="false"
                                     src={"account/photos/" + this.props.userName + ".png"}/></a>
                        </div>
                    </div>
                    <div className="enpQJ">
                        <div className="d7ByH"><span className="Jv7Aj mArmR MqpiF  "><a
                            className="FPmhX notranslate  _0imsa " title={this.props.userName} href={"https://www.instagram.com/" + this.props.userName}
                            tabIndex="0">{this.props.userName}</a></span></div>
                        <div className="wFPL8 ">{this.props.fullName}</div>
                    </div>
                </div>
                <div className="Pkbci">
                    <button className={"sqdOP no_focus " + this.state.button_class} type="button" disabled={this.state.disable} onClick={this.buttonClick}>
                        <SmallLoader text={this.state.button_text} loading={this.state.loading} colour={this.state.loading_colour}/>
                    </button>
                </div>
            </div>
        </li>
        );
    }
}
