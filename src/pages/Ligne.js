import React, { Component } from 'react';
import { Grid, Message, Icon, Dimmer, Loader } from 'semantic-ui-react'
import '../style/page_ligne.css'


export default class Ligne extends Component
{
    constructor(props)
    {
        super(props);
        var type = this.props.match.params.type;
        var line = this.props.match.params.line;
        this.state =
        {
            trafic: null,
            directions: "s",
            loaded: false
        }

    }
    componentWillMount()
    {
        var type = this.props.match.params.type;
        var line = this.props.match.params.line;


        var apiRequest1 = fetch("https://api-ratp.pierre-grimaud.fr/v3/lines/" + type + "s/" + line)
        .then(function(response){
             return response.json()
        });
        var apiRequest2 = fetch("https://api-ratp.pierre-grimaud.fr/v3/traffic/" + type + "s/" + line)
        .then(function(response){
             return response.json()
        });
        var that = this;
        Promise.all([apiRequest1,apiRequest2]).then(function(values){
            that.setState({
                directions: values[0].result[0].directions,
                trafic: values[1].result,
                loaded: true
            }) ;
        });

        //
        // fetch("https://api-ratp.pierre-grimaud.fr/v3/lines/" + type + "s/" + line)
        // .then(response => response.json())
        // .then(data => this.setState({
        //     directions: data.result.directions
        // }))
        // .then(() => {
        //     console.log(this.state.directions)
        // })
        // fetch("https://api-ratp.pierre-grimaud.fr/v3/traffic/" + type + "s/" + line)
        // .then(response => response.json())
        // .then(data => this.setState({
        //     trafic: data.result,
        // }));
        // console.log("ololol")
        // this.setState({loaded: this.state.trafic != null && this.state.directions != null })

    }
    render()
    {
        var type = this.props.match.params.type;
        var line = this.props.match.params.line;
        if (!this.state.loaded)
        {
            return (
                <Grid.Column largeScreen={13} computer={12} tablet={11} className="page_ligne">
                    <Dimmer active inverted>
                        <Loader inverted>Chargement...</Loader>
                    </Dimmer>
                </Grid.Column>
            )
        }
        return (
            <Grid.Column largeScreen={13} computer={12} tablet={11} className="page_ligne">
                <Grid stackable columns={3}>
                    <Grid.Column width={10}>
                        <Message>
                            <Message.Header>
                                <img alt={type + "-logo"} src={"/img/" + type + ".svg"} />
                                <img alt={type + "/" + line + "-logo"} src={"/img/lignes/" + type + "/" + line + ".svg"} />
                                <div className="float_indicator">
                                    {
                                        this.state.trafic.slug === "normal"
                                        && <Icon name="circle" className="status-indicator"/>
                                        || (this.state.trafic.slug === "normal_trav"
                                        && <div><Icon name="circle" className="status-indicator"/>
                                        <Icon name="warning sign" className="status-indicator orange"/></div>
                                        || <Icon name="circle" className="status-indicator red"/>)
                                    }
                                </div>
                                <br />
                                <span className="directions">
                                    {this.state.directions}
                                </span>
                            </Message.Header>
                        </Message>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Message className="trafic">
                            <Message.Header className="perturbation-title">
                                Etat actuel du trafic
                            </Message.Header>
                            <b>
                                {
                                    this.state.trafic.slug !== "normal"
                                    && (this.state.trafic.slug === "normal_trav"
                                    && <Icon name="warning sign" className="status-indicator orange"/>
                                    || <Icon name="circle" className="status-indicator red"/>)
                                }
                                {this.state.trafic.title}
                            </b>
                            <br/>
                            <div className={"trafic_message " + (this.state.trafic.slug === "normal" ? "" : "padding")}>
                                {this.state.trafic.message.charAt(0).toUpperCase() + this.state.trafic.message.slice(1)}
                            </div>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Grid.Column>

        );
    }
}
