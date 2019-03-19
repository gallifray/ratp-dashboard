import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class MyMenu extends Component {
    toggleMenu() {
        var element = document.getElementsByClassName("content_left")[0];
        element.classList.toggle("visible");
    }

    reload() {
        window.location.reload();
    }

    render() {
        return (
            <Menu inverted className="mainbar">
                <Menu.Item className="menu-item" onClick={this.toggleMenu}>
                    <Icon name="bars" className="bars" />
                </Menu.Item>
                <Menu.Item className="logo">
                    <Link to="/">
                        <img alt="ratp-logo" src='/img/ratp-notext-color.png' />
                    </Link>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item onClick={this.reload}>
                        <Icon name="sync alternate" className="refresh" />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default MyMenu;
