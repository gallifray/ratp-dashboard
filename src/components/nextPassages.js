import React, { Component } from 'react';
import { Message, Loader, Dropdown } from 'semantic-ui-react'

export default class NextPassages extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            loaded: false
        }
        fetch("https://api-ratp.pierre-grimaud.fr/v3/stations/" + this.props.type + "s/" + this.props.line)
        .then(response => response.json())
        .then(data => {
            this.setState({ stations: data.result.stations, loaded: true })
        })
    }
    render()
    {
        if (this.state.loaded)
        {
            var stations = this.state.stations
            for(var i = 0; i < stations.length; i++)
            {
                stations[i]["text"] = stations[i]["name"];
                delete stations[i]["name"];    
                stations[i]["value"] = stations[i]["slug"];
                delete stations[i]["slug"];    
            }
            console.log(stations)
            return (
                <Message className="next-passages">
                    <Message.Header>
                        Prochains passages par station
                    </Message.Header>
                    <Message.Content>
                        <p>Séléctionnez une station ci-dessous pour afficher les prochains passages:</p>
                        <Dropdown placeholder='Selectionner une station' fluid search selection options={stations} />
                    </Message.Content>
                </Message>
            )
        }
        else
        {
            return (
                <Message className="next-passages center">
                    <Message.Header>
                        Prochains passages par station
                    </Message.Header>
                    <br />
                    <Loader active inline />
                    <br />
                    Chargement...
                    <br />
                </Message>
            )
        }
    }
}

