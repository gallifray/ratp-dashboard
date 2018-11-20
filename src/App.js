import React, {Component} from 'react';
import MyMenu from './components/menu'
import MyFooter from './components/footer'
import './style/main.css'
import { Image, Popup, Grid, Message, Icon, Container, Loader, Dimmer, List, Menu } from 'semantic-ui-react'

class VerticalMenu extends Component {
    render()
    {
        return (
            <div className="verticalBar">
                <div className="title">MENU</div>
            </div>
        )
    }
}

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

class PerturbationsList extends Component
{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            this.props.data.map((line) =>
                <div>
                {
                    line.slug != "normal"
                    &&         <Popup
                              position='bottom center'
                              size='tiny'
                              key={line.line}
                              trigger={
                                  <div className="perturbation">
                                      <img className="line-logo little" src={"./img/lignes/" + this.props.type + "/" + line.line + ".svg"}/>
                                      <b> {line.title}</b>
                                  </div>
                              }
                              header={line.title}
                              content={line.message.replace("Ts", "Tous")}
                            />
                }
                </div>
            )
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "loaded": false,
            "perturbations": []
        }
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
                <Grid stackable columns={2}>
                    <Grid.Column largeScreen={3} computer={4} tablet={5} only='computer tablet'>
                        <VerticalMenu />
                    </Grid.Column>
                    <Grid.Column largeScreen={13} computer={12} tablet={11}>
                        <Grid stackable columns={2}>
                            <Grid.Column width={6}>
                                <Message>
                                    <Message.Header className="line-header">
                                        <img src="./img/metro.svg" />
                                    </Message.Header>
                                    <Grid centered columns={16}>
                                        <LinesMetro data={this.state.metros} />
                                    </Grid>
                                </Message>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Message>
                                    <Message.Header className="line-header">
                                        <img src="./img/rer.svg" />
                                    </Message.Header>
                                    <Grid centered columns={16}>
                                        <LinesRer data={this.state.rers} />
                                    </Grid>
                                </Message>
                                <Message>
                                    <Message.Header className="line-header">
                                        <img src="./img/tramway.svg" />
                                    </Message.Header>
                                    <Grid centered columns={16}>
                                        <LinesTramway data={this.state.tramways} />
                                    </Grid>
                                </Message>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Message>
                                    <Message.Header className="perturbation-title">
                                        Perturbations en cours
                                        <br/>
                                    </Message.Header>
                                    <PerturbationsList data={this.state.metros} type="metro" />
                                    <PerturbationsList data={this.state.rers} type="rer" />
                                    <PerturbationsList data={this.state.tramways} type="tramway" />
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </div>
            <MyFooter />
        </div>);
        }
        return <div></div>
    }
}

export default App;
