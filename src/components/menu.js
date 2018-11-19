import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'

class MyMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
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
