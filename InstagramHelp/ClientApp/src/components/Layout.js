import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

function ShowNavMenu(props) {
    if(props.isLoggedIn)
    {
        return <NavMenu userName={props.userName} authCheck={props.authCheck}/>;
    }
    else
    {
        return <header/>;
    }
}

export class Layout extends Component {
  static displayName = Layout.name;

    render () {
        return (
            <div>
                <ShowNavMenu isLoggedIn={this.props.isLoggedIn} userName={this.props.userName} authCheck={this.props.authCheck}/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
