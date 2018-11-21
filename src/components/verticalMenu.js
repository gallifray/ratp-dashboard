import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon } from 'semantic-ui-react';


export default class VerticalMenu extends Component {
    render()
    {
        return (
            <div className="verticalBar">
                <Link to="/">
                    <div className="item border">
                        <Icon name="th" />Vue d'ensemble
                    </div>
                </Link>
                <Link to="/traffic">
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
                    v0.2 &mdash; Made by <a rel="noopener noreferrer" target="_blank" href="http://gallifray.fr/">Gallifray</a> with <Icon name="heart" />
                </div>
            </div>
        )
    }
}
