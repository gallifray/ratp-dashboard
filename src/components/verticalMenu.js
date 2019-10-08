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
            <div className="verticalBar">
                <Link to="/" onClick={this.toggleMenu}>
                    <div className="item border">
                        <Icon name="th" />Vue d'ensemble
                    </div>
                </Link>
                {/*<div className="item about">
                    <Icon name="question circle" />À propos
                </div>*/}
                <div className="item legal">
                    <a rel="noopener noreferrer" target="_blank" href="https://github.com/gallifray/ratp-dashboard"><Label>v0.7</Label></a>Made by <a rel="noopener noreferrer" target="_blank" href="http://antoineharel.fr/">Antoine Harel</a> with <Icon name="heart" />
                </div>
            </div>
        )
    }
}
