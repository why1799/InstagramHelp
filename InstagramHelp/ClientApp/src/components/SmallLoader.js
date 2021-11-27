import React, { Component } from 'react';

export class SmallLoader extends Component {
    static displayName = SmallLoader.name;

    constructor(props) {
        super(props);
    }
    
    render() {
        if(!this.props.loading)
        {
            return <div
                className="   flex_column          qF0y9          Igw0E     IwRSH      eGOV_         _4EzTm                                                                                                              ">
                {this.props.text}
            </div>
        }
        else
        {
            return <div
                className="    flex_column         qF0y9          Igw0E     IwRSH        YBx95       _4EzTm  loading_div                                                                                                             _9qQ0O ZUqME"
                data-visualcompletion="loading-state">
                <svg aria-label="Загрузка…" className=" FSiF6 "
                     viewBox="0 0 100 100">
                    <rect fill={this.props.colour} height="10" opacity="0" rx="5" ry="5"
                          transform="rotate(-90 50 50)" width="28" x="67"
                          y="45"></rect>
                    <rect fill={this.props.colour} height="10" opacity="0.125" rx="5" ry="5"
                          transform="rotate(-45 50 50)" width="28" x="67"
                          y="45"></rect>
                    <rect fill={this.props.colour} height="10" opacity="0.25" rx="5" ry="5"
                          transform="rotate(0 50 50)" width="28" x="67"
                          y="45"></rect>
                    <rect fill={this.props.colour} height="10" opacity="0.375" rx="5" ry="5"
                          transform="rotate(45 50 50)" width="28" x="67"
                          y="45"></rect>
                    <rect fill={this.props.colour} height="10" opacity="0.5" rx="5" ry="5"
                          transform="rotate(90 50 50)" width="28" x="67"
                          y="45"></rect>
                    <rect fill={this.props.colour} height="10" opacity="0.625" rx="5" ry="5"
                          transform="rotate(135 50 50)" width="28" x="67"
                          y="45"></rect>
                    <rect fill={this.props.colour} height="10" opacity="0.75" rx="5" ry="5"
                          transform="rotate(180 50 50)" width="28" x="67"
                          y="45"></rect>
                    <rect fill={this.props.colour} height="10" opacity="0.875" rx="5" ry="5"
                          transform="rotate(225 50 50)" width="28" x="67"
                          y="45"></rect>
                </svg>
            </div>
        }
    }
}
