import React, {Component} from 'react';
import MyMenu from './components/menu'
import MyFooter from './components/footer'
import './style/main.css'
import { Image, Popup, Grid, Message, Icon, Container, Loader, Dimmer, List, Menu } from 'semantic-ui-react'
import { LinesRer, LinesMetro, LinesTramway } from './components/lines'

class VerticalMenu extends Component {
    render()
    {
        return (
            <div className="verticalBar">
                <div className="item border">
                    <Icon name="th" />Vue d'ensemble
                </div>
                <div className="item border">
                    <Icon name="clock outline" />Trafic en temps réel
                </div>
                <div className="item border">
                    <Icon name="map outline" />Carte interactive
                </div>
                <div className="item about">
                    <Icon name="question circle" />À propos
                </div>
                <div className="item legal">
                    Made by <a target="_blank" href="http://gallifray.fr/">Gallifray</a> with <Icon name="heart" />
                </div>
            </div>
        )
    }
}

class PerturbationsList extends Component
{
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.loaded)
        {
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
        else return <h1 className="loading-message">Chargement...</h1>
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.reloadAPIData = this.reloadAPIData.bind(this);
        this.state = {
            "loaded": false,
            "reloaded": true
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

    reloadAPIData()
    {
        var that = this;
        that.setState({ loaded: false });
        fetch('https://api-ratp.pierre-grimaud.fr/v3/traffic?_format=json')
        .then(response => response.json())
        .then(data => this.setState({
            "metros": data.result.metros,
            "rers": data.result.rers,
            "tramways": data.result.tramways,
            loaded: true
        }))

    }

    render() {
        if (1)
        {
        return (<div>
            <MyMenu reloadAPIData={this.reloadAPIData} />
            <div className="main-content">
                <Grid stackable columns={2}>
                    <Grid.Column largeScreen={3} computer={4} tablet={5} className="responsive-menu">
                        <VerticalMenu />
                    </Grid.Column>
                    <Grid.Column largeScreen={13} computer={12} tablet={11}>
                        <Grid stackable columns={3} reversed='mobile'>
                            <Grid.Column width={6}>
                                <Message>
                                    <Message.Header className="line-header">
                                        <img src="./img/metro.svg" />
                                    </Message.Header>
                                    <Grid centered columns={16}>
                                        <LinesMetro data={this.state.metros} loaded={this.state.loaded}/>
                                    </Grid>
                                </Message>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Message>
                                    <Message.Header className="line-header">
                                        <img src="./img/rer.svg" />
                                    </Message.Header>
                                    <Grid centered columns={16}>
                                        <LinesRer data={this.state.rers} loaded={this.state.loaded}/>
                                    </Grid>
                                </Message>
                                <Message>
                                    <Message.Header className="line-header">
                                        <img src="./img/tramway.svg" />
                                    </Message.Header>
                                    <Grid centered columns={16}>
                                        <LinesTramway data={this.state.tramways} loaded={this.state.loaded}/>
                                    </Grid>
                                </Message>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Message>
                                    <Message.Header className="perturbation-title">
                                        <Icon name="warning circle" />
                                        Perturbations
                                        <br/>
                                    </Message.Header>
                                    <h3>Métro:</h3>
                                    <PerturbationsList data={this.state.metros} type="metro" loaded={this.state.loaded} />
                                    <h3>RER:</h3>
                                    <PerturbationsList data={this.state.rers} type="rer" loaded={this.state.loaded} />
                                    <h3>Tramway:</h3>
                                    <PerturbationsList data={this.state.tramways} type="tramway" loaded={this.state.loaded} />
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </div>
        </div>);
        }
    }
}

export default App;
