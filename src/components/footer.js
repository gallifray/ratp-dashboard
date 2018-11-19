import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

class MyFooter extends Component {
  render() {
    return (
      <div className="myfooter">
        Made by <a target="_blank" href="https://github.com/gallifray">Gallifray</a> with <Icon name="heart" />
      </div>
    )
  }
}

export default MyFooter;
