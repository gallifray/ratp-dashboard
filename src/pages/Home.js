import React, { Component } from 'react';
import '../style/main.css';
import { Popup, Grid, Message, Icon, Loader, Dimmer } from 'semantic-ui-react';
import Lines from '../components/lines';
import { Link } from "react-router-dom";


class PerturbationsList extends Component
{
    render()
    {
        if (this.props.loaded)
        {
                return(
                    this.props.data.map((line) =>
                    <div key={"perturbation/" + line.line}>
                        {
                            line.slug !== "normal"
                            &&
                            <Link key={this.props.type + "/" + line.line} to={"/ligne/" + this.props.type + "/" + line.line + "/"}>
                                <Popup
                                    position='bottom center'
                                    size='tiny'
                                    key={line.line}
                                    trigger={
                                        <div className="perturbation">
                                            <img
                                                className="line-logo little"
                                                src={"/img/lignes/" + this.props.type + "/" + line.line + ".svg"}
                                                alt={"/img/lignes/" + this.props.type + "/" + line.line}
                                            />
                                            <b> {line.title}</b>
                                        </div>
                                    }
                                    header={line.title}
                                    content={line.message.replace("Ts", "Tous")}
                                />
                            </Link>
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
        fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic?_format=json')
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
        fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic?_format=json')
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
                <Grid stackable columns={3} reversed='mobile'>
                    <Grid.Column width={6}>
                        <Message>
                            <Message.Header className="line-header">
                                <img alt="metro-logo" src="/img/metro.svg" />
                            </Message.Header>
                            <Grid centered columns={16}>
                                {
                                    !this.state.reloaded &&
                                    <Dimmer active inverted>
                                        <Loader inverted />
                                    </Dimmer>
                                }
                                <Lines data={this.state.metros} loaded={this.state.loaded} type="metro"/>
                            </Grid>
                        </Message>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Message>
                            <Message.Header className="line-header">
                                <img alt="rer-logo" src="/img/rer.svg" />
                            </Message.Header>
                            <Grid centered columns={16}>
                                {
                                    !this.state.reloaded &&
                                    <Dimmer active inverted>
                                        <Loader inverted />
                                    </Dimmer>
                                }
                                <Lines data={this.state.rers} loaded={this.state.loaded} type="rer"/>
                            </Grid>
                        </Message>
                        <Message>
                            <Message.Header className="line-header">
                                <img alt="tramway-logo" src="/img/tramway.svg" />
                            </Message.Header>
                            <Grid centered columns={16}>
                                {
                                    !this.state.reloaded &&
                                    <Dimmer active inverted>
                                        <Loader inverted />
                                    </Dimmer>
                                }
                                <Lines data={this.state.tramways} loaded={this.state.loaded} type="tramway"/>
                            </Grid>
                        </Message>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Message className="perturbation_message">
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
        );
    }
}

export default Home;
