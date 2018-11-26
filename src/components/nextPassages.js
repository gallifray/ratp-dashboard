import React, { Component } from 'react';
import { Message, Loader, Dropdown, Statistic, Icon } from 'semantic-ui-react'

function getDestinations(schedules) {
    var destinations = []
    for (var i = 0; i < schedules.length; i++)
    {
        var schedule = schedules[i]
        if (!destinations.includes(schedule.destination))
            destinations.push(schedule.destination)
    }
    return destinations;
}

const Destination = function(props)
{
    return (
        <div className="destination">
            <h2>{props.destination}</h2>
            {
                props.schedules.map(function(schedule) {
                    if (schedule.destination == props.destination)
                    {
                        return (
                            <div className="line">
                                {schedule.message}
                            </div>
                        )
                    }
                })
            }
        </div>
    );
};

class NextPassages extends Component
{
    constructor(props)
    {
        super(props);
        console.log(this.props.stations["0"].value)
        this.state =
        {
            loaded: false,
            station: this.props.stations[0].value,
            schedules: null
        }
    }

    handleChange = (event, data) => {
        this.setState({ station: data.value })
            console.log("yeah")
            this.setState({loaded: false})
            fetch("https://api-ratp.pierre-grimaud.fr/v3/schedules/" + this.props.type + "s/" + this.props.line + "/" + data.value + "/A+R")
            .then(response => response.json())
            .then(data => {
                console.log("ok")
                this.setState({ schedules: data.result.schedules, loaded: true });
                console.log(this.state.schedules)
            });
    }

    render()
    {
        console.log(this.props.stations["0"].value)
        if (!this.state.station)
        {
            return (
                <div>
                    <Dropdown
                        placeholder='Rechercher une station'
                        fluid search selection
                        options={this.props.stations}
                        onChange={this.handleChange}
                        value={this.state.station}
                    />
                </div>
            ) 
        }
        if (!this.state.loaded)
        {
            return (
                <div>
                    <Dropdown
                        placeholder='Rechercher une station'
                        fluid search selection
                        options={this.props.stations}
                        onChange={this.handleChange}
                        value={this.state.station}
                    />
                    <Loader inline active />
                </div>
            ) 
        }

        if (!this.state.schedules)
            return <p>Données indisponibles</p>

        var schedules = this.state.schedules
        var destinations = getDestinations(schedules)
        
        return (
            <div>
                <Dropdown
                    placeholder='Rechercher une station'
                    fluid search selection
                    options={this.props.stations}
                    onChange={this.handleChange}
                    value={this.state.station}
                />
                {
                    destinations.map(destination => 
                        <Destination destination={destination} schedules={schedules} />
                    )
                }
            </div>
        ) 

    }
}

export default class NextPassagesContainer extends Component
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
            var stations = this.state.stations
            for(var i = 0; i < stations.length; i++)
            {
                stations[i]["text"] = stations[i]["name"];
                delete stations[i]["name"];    
                stations[i]["value"] = stations[i]["slug"];
                stations[i]["key"] = stations[i]["slug"];
                delete stations[i]["slug"];    
            }

        })
    }
    render()
    {
        if (this.state.loaded)
        {
            var stations = this.state.stations
            return (
                <Message className="next-passages">
                    <Message.Header>
                        <Icon name="clock outline" /> Prochains passages
                    </Message.Header>
                    <Message.Content>
                        <p>Séléctionnez ou recherchez une station ci-dessous pour afficher les prochains passages:</p>
                        <NextPassages line={this.props.line} type={this.props.type} stations={stations}/>
                    </Message.Content>
                </Message>
            )
        }
        else
        {
            return (
                <Message className="next-passages center">
                    <Message.Header>
                        Prochains passages
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

