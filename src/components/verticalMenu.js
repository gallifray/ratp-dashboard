import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon, Label, Select } from 'semantic-ui-react';


export default class VerticalMenu extends Component {
    toggleMenu()
    {
        var element = document.getElementsByClassName("content_left")[0];
        element.classList.toggle("visible");
    }

    render()
    {
        return (
            <div className="verticalBar center">
                <Link to="/" onClick={this.toggleMenu}>
                    <div className="item border">
                        <Icon name="th" />Vue d'ensemble
                    </div>
                </Link>
                {/*<div className="item about">
                    <Icon name="question circle" />À propos
                </div>*/}
                <div className="item legal">
                    <Label>v0.6</Label>Made by <a rel="noopener noreferrer" target="_blank" href="http://gallifray.fr/">Gallifray</a> with <Icon name="heart" />
                </div>
            </div>
        )
    }
}
