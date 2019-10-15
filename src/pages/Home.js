import React, { Component } from 'react';
import '../style/main.css';
import { Popup, Grid, Message, Icon, Loader, Dimmer, Header } from 'semantic-ui-react';
import Lines from '../components/lines';
import { Link } from "react-router-dom";


class TravauxList extends Component
{
    render()
    {
        if (this.props.loaded)
        {
            let perturbations = this.props.data.filter(l => l.slug.includes("trav"));
            console.log(perturbations);
            if (perturbations.length === 0)
                return null;
            return (
                <div style={{marginBottom: "30px"}}>
                    <Header textAlign="center" as="h3">{(this.props.type === "metro") ? "Metro" : (this.props.type === "rer" ? "RER" : "Tramway")}</Header>
                    <Grid centered columns={16}>
                        <Lines hideStatus data={perturbations} loaded type={this.props.type} />
                    </Grid>
                </div>
            )
        }
        else return <h1 className="loading-message">Chargement...</h1>
    }
}

class PerturbationsList extends Component
{
    render()
    {
        if (this.props.loaded)
        {
            let perturbations = this.props.data.filter(l => !l.slug.includes("normal"))
            if (perturbations.length === 0) return null;
                return (
                    <div>
                    <h3>{(this.props.type === "metro") ? "Metro" : (this.props.type === "rer" ? "RER" : "Tramway")}</h3>
                    {perturbations.map((line) =>
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
                    )}
                    </div>

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
                <Grid centered stackable columns={3} reversed='mobile'>
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
                            <Lines data={this.state.metros} loaded={this.state.loaded} type="metro" />
                        </Grid>
                    </Message>
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
                            <Lines data={this.state.rers} loaded={this.state.loaded} type="rer" />
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
                            <Lines data={this.state.tramways} loaded={this.state.loaded} type="tramway" />
                        </Grid>
                    </Message>

                </Grid.Column>
                    <Grid.Column width={5}>
                        <Message color="red" className="perturbation_message">
                            <Message.Header className="perturbation-title">
                                <Icon name="warning circle" color="red" />
                                Perturbations en cours
                                    <br />
                            </Message.Header>
                            {
                                !this.state.reloaded &&
                                <Dimmer active inverted>
                                    <Loader inverted />
                                </Dimmer>
                            }
                            <PerturbationsList data={this.state.metros} type="metro" loaded={this.state.loaded} />
                            <PerturbationsList data={this.state.rers} type="rer" loaded={this.state.loaded} />
                            <PerturbationsList data={this.state.tramways} type="tramway" loaded={this.state.loaded} />
                        </Message>
                        <Message color="orange" className="perturbation_message">
                            <Message.Header className="perturbation-title">
                                <Icon name="warning sign" />
                                Travaux
                                <br />
                            </Message.Header>
                            {
                                !this.state.reloaded &&
                                <Dimmer active inverted>
                                    <Loader inverted />
                                </Dimmer>
                            }
                            <TravauxList data={this.state.metros} type="metro" loaded={this.state.loaded} />
                            <TravauxList data={this.state.rers} type="rer" loaded={this.state.loaded} />
                            <TravauxList data={this.state.tramways} type="tramway" loaded={this.state.loaded} />
                        </Message>
                    </Grid.Column>

                </Grid>
        );
    }
}

export default Home;
