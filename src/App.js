import React, { Component } from 'react';
import MyMenu from './components/menu'
import MyFooter from './components/footer'
import './style/main.css'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Image, Popup, Grid, Message, Icon, Container, Loader, Dimmer, List, Menu } from 'semantic-ui-react'
import { LinesRer, LinesMetro, LinesTramway } from './components/lines'
import Home from './pages/Home';


class VerticalMenu extends Component {
    render()
    {
        return (
            <div className="verticalBar">
                <Link to="/">
                    <div className="item border">
                        <Icon name="th" />Vue d'ensemble
                    </div>
                </Link>
                <Link to="traffic">
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
                    v0.2 &mdash; Made by <a target="_blank" href="http://gallifray.fr/">Gallifray</a> with <Icon name="heart" />
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
        this.setState({ reloaded: false });
        fetch('https://api-ratp.pierre-grimaud.fr/v3/traffic?_format=json')
        .then(response => response.json())
        .then(data => this.setState({
            "metros": data.result.metros,
            "rers": data.result.rers,
            "tramways": data.result.tramways,
            "reloaded": true
        }))

    }

    render() {
        return (
            <Router>
                <div>
                    <MyMenu reloadAPIData={this.reloadAPIData} />
                    <div className="main-content">
                        <Grid stackable columns={2}>
                            <Grid.Column largeScreen={3} computer={4} tablet={5} className="responsive-menu">
                                <VerticalMenu />
                            </Grid.Column>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                            </Switch>
                        </Grid>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;
