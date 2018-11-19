import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import MyMenu from './components/menu'
import MyFooter from './components/footer'
import './style/main.css'
import { Popup, Grid, Message, Icon, Container } from 'semantic-ui-react'

class Lines extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        this.props.metros.map((line) =>
        <Popup
          position='bottom center'
          size='tiny'
          key={line.line}
          trigger={        <Grid.Column>
                      <div className="line-status">
                          <img className="line-logo " src={"./img/lignes/" + line.line + ".svg"}/>
                          <br />
                          {
                              line.slug === "normal"
                              && <Icon name="circle" className="status-indicator"/>
                              || (line.slug === "normal_trav"
                                  && <Icon name="warning sign" className="status-indicator orange"/>
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
        fetch('https://api-ratp.pierre-grimaud.fr/v3/traffic/metros').then(response => response.json()).then(data => this.setState({"metros": data.result.metros, "loaded": true}));
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
                            Métros
                        </Message.Header>
                        <Grid centered stackable="stackable" columns={16}>
                            <Lines metros={this.state.metros} />
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
