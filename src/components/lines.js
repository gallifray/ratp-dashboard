import React, {Component} from 'react';
import '../style/main.css'
import { Image, Popup, Grid, Message, Icon, Container, Loader, Dimmer, List, Menu } from 'semantic-ui-react'


export class LinesTramway extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        this.props.data.map((line) =>
        <Popup
          position='bottom center'
          size='tiny'
          key={line.line}
          trigger={
                  <div className="line-status">
                      <img className="line-logo " src={"./img/lignes/tramway/" + line.line + ".svg"}/>
                      <br />
                      {
                          line.slug === "normal"
                          && <Icon name="circle" className="status-indicator"/>
                          || (line.slug === "normal_trav"
                              && <div><Icon name="circle" className="status-indicator"/>
                          <Icon name="warning sign" className="status-indicator orange"/></div>
                              || <Icon name="circle" className="status-indicator red"/>)
                      }
                  </div>}
          header={line.title}
          content={line.message.replace("Ts", "Tous")}
        />)
    )
    }
}

export class LinesMetro extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        this.props.data.map((line) =>
        <Popup
          position='bottom center'
          size='tiny'
          key={line.line}
          trigger={
                  <div className="line-status">
                      <img className="line-logo " src={"./img/lignes/metro/" + line.line + ".svg"}/>
                      <br />
                          {
                              line.slug === "normal"
                              && <Icon name="circle" className="status-indicator"/>
                              || (line.slug === "normal_trav"
                                  && <div><Icon name="circle" className="status-indicator"/>
                              <Icon name="warning sign" className="status-indicator orange"/></div>
                                  || <Icon name="circle" className="status-indicator red"/>)
                          }
                  </div>}
          header={line.title}
          content={line.message.replace("Ts", "Tous")}
        />)
    )
    }
}

export class LinesRer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        this.props.data.map((line) =>
        <Popup
          position='bottom center'
          size='tiny'
          key={line.line}
          trigger={
                  <div className="line-status">
                      <img className="line-logo " src={"./img/lignes/rer/" + line.line + ".svg"}/>
                      <br />
                          {
                              line.slug === "normal"
                              && <Icon name="circle" className="status-indicator"/>
                              || (line.slug === "normal_trav"
                                  && <div><Icon name="circle" className="status-indicator"/>
                              <Icon name="warning sign" className="status-indicator orange"/></div>
                                  || <Icon name="circle" className="status-indicator red"/>)
                          }
                  </div>}
          header={line.title}
          content={line.message.replace("Ts", "Tous")}
        />)
    )
    }
}
