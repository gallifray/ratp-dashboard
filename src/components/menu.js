import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Menu, Icon } from 'semantic-ui-react'

class MyMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable inverted centered>
        <Menu.Item>
          <img src='./img/ratp-notext-color.png' />
        </Menu.Item>
      </Menu>
    )
  }
}

export default MyMenu;
