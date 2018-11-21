import React, { Component } from 'react';
import MyMenu from '../components/menu';
import MyFooter from '../components/footer';
import '../style/main.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Image, Popup, Grid, Message, Icon, Container, Loader, Dimmer, List, Menu } from 'semantic-ui-react';
import { LinesRer, LinesMetro, LinesTramway } from '../components/lines';


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

class Home extends Component {
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
            <Grid.Column largeScreen={13} computer={12} tablet={11}>
                <Grid stackable columns={3} reversed='mobile'>
                    <Grid.Column width={6}>
                        <Message>
                            <Message.Header className="line-header">
                                <img src="./img/metro.svg" />
                            </Message.Header>
                            <Grid centered columns={16}>
                                {
                                    !this.state.reloaded &&
                                    <Dimmer active inverted>
                                        <Loader inverted />
                                    </Dimmer>
                                }
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
                                {
                                    !this.state.reloaded &&
                                    <Dimmer active inverted>
                                        <Loader inverted />
                                    </Dimmer>
                                }
                                <LinesRer data={this.state.rers} loaded={this.state.loaded}/>
                            </Grid>
                        </Message>
                        <Message>
                            <Message.Header className="line-header">
                                <img src="./img/tramway.svg" />
                            </Message.Header>
                            <Grid centered columns={16}>
                                {
                                    !this.state.reloaded &&
                                    <Dimmer active inverted>
                                        <Loader inverted />
                                    </Dimmer>
                                }
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
                            {
                                !this.state.reloaded &&
                                <Dimmer active inverted>
                                    <Loader inverted />
                                </Dimmer>
                            }
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
        );
    }
}

export default Home;
