import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon } from 'semantic-ui-react';


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
                <Link to="/traffic" onClick={this.toggleMenu}>
                    <div className="item border">
                        <Icon name="clock outline" />Trafic en temps réel
                    </div>
                </Link>
                <div className="item border">
                    <Icon name="map outline" />Carte interactive
                </div>
                <div className="item about">
                    <Icon name="question circle" />À propos
                </div>
                <div className="item legal">
                    v0.4 &mdash; Made by <a rel="noopener noreferrer" target="_blank" href="http://gallifray.fr/">Gallifray</a> with <Icon name="heart" />
                </div>
            </div>
        )
    }
}
