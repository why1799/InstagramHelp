import React, { Component } from 'react';
import './Login.css';

function LoginFailed(props) {
    if(props.loginFailed)
    {
        return <div className="eiCW-"><p aria-atomic="true" data-testid="login-error-message"
                                         id="slfErrorAlert" role="alert">{props.message}</p></div>
    }
    else
    {
        return <div className="eiCW-"/>
    }
}

function EnterButton(props) {
    if(!props.loadingLogin)
    {
        return <div
            className="   flex_column          qF0y9          Igw0E     IwRSH      eGOV_         _4EzTm                                                                                                              ">Войти
        </div>
    }
    else
    {
        return <div
            className="    flex_column         qF0y9          Igw0E     IwRSH        YBx95       _4EzTm  loading_div                                                                                                             _9qQ0O ZUqME"
            data-visualcompletion="loading-state">
            <svg aria-label="Загрузка…" className=" FSiF6 "
                 viewBox="0 0 100 100">
                <rect fill="#fafafa" height="10" opacity="0" rx="5" ry="5"
                      transform="rotate(-90 50 50)" width="28" x="67"
                      y="45"></rect>
                <rect fill="#fafafa" height="10" opacity="0.125" rx="5" ry="5"
                      transform="rotate(-45 50 50)" width="28" x="67"
                      y="45"></rect>
                <rect fill="#fafafa" height="10" opacity="0.25" rx="5" ry="5"
                      transform="rotate(0 50 50)" width="28" x="67"
                      y="45"></rect>
                <rect fill="#fafafa" height="10" opacity="0.375" rx="5" ry="5"
                      transform="rotate(45 50 50)" width="28" x="67"
                      y="45"></rect>
                <rect fill="#fafafa" height="10" opacity="0.5" rx="5" ry="5"
                      transform="rotate(90 50 50)" width="28" x="67"
                      y="45"></rect>
                <rect fill="#fafafa" height="10" opacity="0.625" rx="5" ry="5"
                      transform="rotate(135 50 50)" width="28" x="67"
                      y="45"></rect>
                <rect fill="#fafafa" height="10" opacity="0.75" rx="5" ry="5"
                      transform="rotate(180 50 50)" width="28" x="67"
                      y="45"></rect>
                <rect fill="#fafafa" height="10" opacity="0.875" rx="5" ry="5"
                      transform="rotate(225 50 50)" width="28" x="67"
                      y="45"></rect>
            </svg>
        </div>
    }
}

function ShowButton(props) {
    if(props.isVisible)
    {
        return <div className="i24fI">
            <div
                className="   flex_column          qF0y9          Igw0E     IwRSH      eGOV_         _4EzTm                      soMvl                                                                                        ">
                <button id="passwordButton" className="sqdOP yWX7d     _8A5w5 btn btn_font  "
                        type="button"
                        onClick={props.func}>{props.text}
                </button>
            </div>
        </div>;
    }
    else
    {
        return <div className="i24fI"/>;
    }
}

export class Login extends Component {

    componentDidMount(props){
        document.title = "Войти";
    }
    
    constructor(props) {
        super(props);
        this.state = { 
            currentCount: 0,
            loginValue: '',
            passwordValue: '',
            showPassword: false,
            passwordButtonText: 'Показать',
            passwordInputType: 'password',
            disableEnter: true,
            loginLabelClass: '',
            passwordLabelClass: '',
            showButtonIsVisible: false,
            loadingLogin: false,
            loginFailed: false,
            loginFailedMessage: ''
        };
        this.changePasswordStatus = this.changePasswordStatus.bind(this);
        this.updateLoginValue = this.updateLoginValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    updateLoginValue(evt) {
        let labelClass;
        if(evt.target.value == null || evt.target.value === '')
        {
            labelClass = '';
        }
        else
        {
            labelClass = 'FATdn';
        }
        
        this.setState({
            loginValue: evt.target.value,
            disableEnter: evt.target.value == null ||
                evt.target.value === '' ||
                this.state.passwordValue == null ||
                this.state.passwordValue === '' ||
                this.state.passwordValue < 6,
            loginLabelClass: labelClass
        });
    }

    updatePasswordValue(evt) {
        let labelClass;
        let isVisible;
        if(evt.target.value == null || evt.target.value === '')
        {
            isVisible = false;
            labelClass = '';
        }
        else
        {
            isVisible = true;
            labelClass = 'FATdn';
        }
        
        this.setState({
            passwordValue: evt.target.value,
            disableEnter: evt.target.value == null ||
                evt.target.value === '' ||
                evt.target.value.length < 6 ||
                this.state.loginValue == null ||
                this.state.loginValue === '',
            passwordLabelClass: labelClass,
            showButtonIsVisible: isVisible
        });
    }

    changePasswordStatus() {
        let text;
        let type;
        if(this.state.showPassword)
        {
            text = 'Показать';
            type = 'password';
        }
        else
        {
            text = 'Скрыть';
            type = 'text';
        }
        
        this.setState({
            showPassword: !this.state.showPassword,
            passwordButtonText : text,
            passwordInputType: type
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({
            loadingLogin: true
        });
        
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserName: this.state.loginValue,
                Password: this.state.passwordValue,
            })
        };
        const fetchResponse = await fetch('api/auth/login', settings);
        const data = await fetchResponse.json();
        
        if(fetchResponse.status === 403)
        {
            if(data.message === 'Invalid Credentials')
            {
                this.setState({
                    loginFailed: true,
                    loginFailedMessage: 'К сожалению, вы ввели неправильный пароль. Проверьте свой пароль еще раз.'
                });
            }
            else
            {
                this.setState({
                    loginFailed: true,
                    loginFailedMessage: 'Во время авторизации произошла непредвиденная ошибка'
                });
            }
        }
        else
        {
            this.props.authCheck();
        }

        this.setState({
            loadingLogin: false
        });
    }

    render() {
        return (
            <div className="flex_column">
                <div
                    className="             qF0y9          Igw0E   rBNOH          YBx95   ybXk5   vwCYk              MGky5                                                              i0EQd">
                    <div className="rgFsT   ">
                        <div className="gr27e  "><h1
                            className="NXVPg Szr5J  coreSpriteLoggedOutWordmark  ">InstagramHelp</h1>
                            <div className="EPjEi">
                                <form className="HmktE" id="loginForm" method="post" onSubmit={this.handleSubmit}>
                                    <div
                                        className="    flex_column         qF0y9          Igw0E     IwRSH      eGOV_         _4EzTm                                                              kEKum                                                ">
                                        <div className="-MzZI">
                                            <div className="_9GP1n   "><label className={'f0n8F ' + this.state.loginLabelClass}><span
                                                className="_9nyy2">Телефон, имя пользователя или эл. адрес</span>
                                                <input
                                                aria-label="Телефон, имя пользователя или эл. адрес" aria-required="true"
                                                autoCapitalize="off" autoCorrect="off" maxLength="75" name="username"
                                                type="text" className="_2hvTZ pexuQ zyHYP" value={this.state.loginValue} onChange={(e) => this.updateLoginValue(e)}/></label>
                                                <div className="i24fI"></div>
                                            </div>
                                        </div>
                                        <div className="-MzZI">
                                            <div className="_9GP1n   "><label className={'f0n8F ' + this.state.passwordLabelClass}><span
                                                className="_9nyy2">Пароль</span><input aria-label="Пароль"
                                                                                       aria-required="true"
                                                                                       autoCapitalize="off"
                                                                                       autoCorrect="off" name="password"
                                                                                       type={this.state.passwordInputType}
                                                                                       className="_2hvTZ pexuQ zyHYP"
                                                                                       value={this.state.passwordValue} 
                                                                                       onChange={(e) => this.updatePasswordValue(e)}/></label>
                                                    <ShowButton func={this.changePasswordStatus} text={this.state.passwordButtonText} isVisible={this.state.showButtonIsVisible} />
                                            </div>
                                        </div>
                                        <div
                                            className="    flex_column         qF0y9          Igw0E     IwRSH      eGOV_         _4EzTm    bkEs3                          CovQj                  jKUp7          DhRcB                                                    ">
                                            <button className="sqdOP  L3NKy   y3zKF  btn_font   " disabled={this.state.disableEnter} type="submit">
                                                <EnterButton loadingLogin={this.state.loadingLogin}/>
                                            </button>
                                        </div>
                                    </div>
                                    <LoginFailed loginFailed={this.state.loginFailed} message={this.state.loginFailedMessage}/>
                                    <a className="_2Lks6" href="https://www.instagram.com/accounts/password/reset/" tabIndex="0">Забыли
                                        пароль?</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
