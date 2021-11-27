import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function OpenMenu(props) {
  if(props.openMenu)
  {
    return <div className="poA5q div_photo flex_column">
      <div className="wgVJm" role="none"></div>
      <div aria-hidden="false" className="uo5MA   _2ciX tWgj8 XWrBI ">
        <div className="AvhYw nLL4f div_style_2"/>
        <div className="_01UL2">
          <div className="-qQT3" aria-disabled="false" role="button" tabIndex="0" onClick={props.logOut}>
            <div aria-labelledby="f1f2795200404d8 f3af580b0b28d1c f5d670374a8554 faf3e0eba01ff8"
                 className="             qF0y9          Igw0E   rBNOH        eGOV_     ybXk5    _4EzTm                                                                                   XfCBB          HVWg4                  _09OdB ZUqME">
              <div
                  className="             qF0y9          Igw0E     IwRSH        YBx95      vwCYk                                                                                                               ">
                <div
                    className="             qF0y9          Igw0E     IwRSH      eGOV_         _4EzTm                                                                                                              "
                    id="f3af580b0b28d1c">
                  <div className="_7UhW9   xLCgt      MMzan  KV-D4              fDxYl     ">
                    <div
                        className="    div_style_1         qF0y9          Igw0E     IwRSH        YBx95       _4EzTm                                                                                                              "
                    >
                      <div
                          className="_7UhW9   xLCgt      MMzan  KV-D4              fDxYl     ">Выйти
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="TOh1s"></div>
      </div>
    </div>
  }
  else
  {
    return <div className="poA5q div_photo flex_column"/>
  }
}


export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      openMenu: false
    };

    this.setOpenMenu = this.setOpenMenu.bind(this);
    this.setCloseMenu = this.setCloseMenu.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
  }
  
  setOpenMenu()
  {
    this.setState({
      openMenu: true
    });
  }
  
  setCloseMenu = async() =>
  {
    await sleep(100);
    this.setState({
      openMenu: false
    });
  }
  
  logOut = async() =>
  {
    const settings = {
    method: 'GET'
  };
    const fetchResponse = await fetch('api/auth/logOut', settings);
    
    if(fetchResponse.status === 204)
    {
      this.props.authCheck();
    }
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img width="161px" alt="InstagramHelp" src="images/instagram_help_mini.png"/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <div className="XrOey flex_column div_margin" onFocus={this.setOpenMenu} onBlur={this.setCloseMenu}>
                    <div className="wWGrn"/>
                    <span className="_2dbep qNELH span_style" role="link" tabIndex="0" ><img 
                        alt={"Фото профиля " + this.props.userName} className="_6q-tv img_style" crossOrigin="anonymous" data-testid="user-avatar"
                        draggable="false"
                        src={"account/photos/" + this.props.userName + ".png"}/>
                    </span>
                    <OpenMenu openMenu={this.state.openMenu} logOut={this.logOut}/>
                  </div>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
