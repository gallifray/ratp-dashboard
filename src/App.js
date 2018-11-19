import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import MyMenu from './components/menu'
import MyFooter from './components/footer'
import './style/main.css'
import { Popup, Grid, Message, Icon, Container } from 'semantic-ui-react'

class LinesTramway extends Component {
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
              <Grid.Column>
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
                  </div>
              </Grid.Column>}
          header={line.title}
          content={line.message}
        />)
    )
    }
}

class LinesMetro extends Component {
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
              <Grid.Column>
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
                  </div>
              </Grid.Column>}
          header={line.title}
          content={line.message}
        />)
    )
    }
}

class LinesRer extends Component {
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
              <Grid.Column>
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
                  </div>
              </Grid.Column>}
          header={line.title}
          content={line.message}
        />)
    )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "loaded": false
        }
    }
    componentDidMount() {
        fetch('https://api-ratp.pierre-grimaud.fr/v3/traffic?_format=json')
        .then(response => response.json())
        .then(data => this.setState({
            "metros": data.result.metros,
            "rers": data.result.rers,
            "tramways": data.result.tramways,
            "loaded": true
        }))
    }
    render() {
        if (this.state.loaded)
        {
        return (<div>
            <MyMenu/>
            <div className="main-content">
                <Container>
                    <Message>
                        <Message.Header>
                            Métro
                        </Message.Header>
                        <Grid centered stackable="stackable" columns={16}>
                            <LinesMetro data={this.state.metros} />
                        </Grid>
                    </Message>
                </Container>
                <Container>
                    <Message>
                        <Message.Header>
                            RER
                        </Message.Header>
                        <Grid centered stackable="stackable" columns={16}>
                            <LinesRer data={this.state.rers} />
                        </Grid>
                    </Message>
                </Container>
                <Container>
                    <Message>
                        <Message.Header>
                            Trawmay
                        </Message.Header>
                        <Grid centered stackable="stackable" columns={16}>
                            <LinesTramway data={this.state.tramways} />
                        </Grid>
                    </Message>
                </Container>
            </div>
            <MyFooter />
        </div>);
        }
        return <h1>Loading</h1>
    }
}

export default App;
