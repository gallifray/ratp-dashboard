import React, { Component } from 'react';
import { Message, Loader, Statistic } from 'semantic-ui-react'

export default class AverageTime extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            resolved: false,
            stations: null,
            times: [],
            error: false
        }
        fetch("https://api-ratp.pierre-grimaud.fr/v3/stations/" + this.props.type + "s/" + this.props.line)
        .then(response => response.json())
        .then(data => {
            this.setState({
                stations: data.result.stations,
                points: [
                    data.result.stations[Math.floor(data.result.stations.length * 0.25)],
                    data.result.stations[Math.floor(data.result.stations.length * 0.5)],
                    data.result.stations[Math.floor(data.result.stations.length * 0.75)]
                ]
            });
            return fetch("https://api-ratp.pierre-grimaud.fr/v3/schedules/" + this.props.type + "s/" + this.props.line + "/" + this.state.points[0].slug + "/A+R")
        })
        .then(response => response.json())
        .then(data => {
            var schedule = data.result.schedules
            var val1, val2;

            if (schedule[0].message.includes("mn"))
                val1 = parseInt(schedule[0].message.substring(0, schedule[0].message.length - 2));
            else
                val1 = 0;
            if (schedule[1].message.includes("mn"))
                val2 = parseInt(schedule[1].message.substring(0, schedule[1].message.length - 2));
            else
                val2 = 0;
            this.setState(prev => ({
                times: [...prev.times, val2 - val1]
            }))
            if (schedule[0].destination !== schedule[Math.floor(schedule.length / 2)].destination)
            {
                if (schedule[Math.floor(schedule.length / 2)].message.includes("mn"))
                    val1 = parseInt(schedule[Math.floor(schedule.length / 2)].message.substring(0, schedule[Math.floor(schedule.length / 2)].message.length - 2));
                else
                    val1 = 0;
                if (schedule[Math.floor(schedule.length / 2) + 1].message.includes("mn"))
                    val2 = parseInt(schedule[Math.floor(schedule.length / 2) + 1].message.substring(0, schedule[Math.floor(schedule.length / 2) + 1].message.length - 2));
                else
                    val2 = 0;
                this.setState(prev => ({
                    times: [...prev.times, val2 - val1]
                }))
            }
            return fetch("https://api-ratp.pierre-grimaud.fr/v3/schedules/" + this.props.type + "s/" + this.props.line + "/" + this.state.points[1].slug + "/A+R")
        })
        .catch(rej => {
            this.setState({error: true});
        })
        .then(response => response.json())
        .then(data => {
            var schedule = data.result.schedules
            var val1, val2;

            if (schedule[0].message.includes("mn"))
                val1 = parseInt(schedule[0].message.substring(0, schedule[0].message.length - 2));
            else
                val1 = 0;
            if (schedule[1].message.includes("mn"))
                val2 = parseInt(schedule[1].message.substring(0, schedule[1].message.length - 2));
            else
                val2 = 0;
            this.setState(prev => ({
                times: [...prev.times, val2 - val1]
            }))
            if (schedule[0].destination !== schedule[Math.floor(schedule.length / 2)].destination)
            {
                if (schedule[Math.floor(schedule.length / 2)].message.includes("mn"))
                    val1 = parseInt(schedule[Math.floor(schedule.length / 2)].message.substring(0, schedule[Math.floor(schedule.length / 2)].message.length - 2));
                else
                    val1 = 0;
                if (schedule[Math.floor(schedule.length / 2) + 1].message.includes("mn"))
                    val2 = parseInt(schedule[Math.floor(schedule.length / 2) + 1].message.substring(0, schedule[Math.floor(schedule.length / 2) + 1].message.length - 2));
                else
                    val2 = 0;
                this.setState(prev => ({
                    times: [...prev.times, val2 - val1]
                }))
            }
            return fetch("https://api-ratp.pierre-grimaud.fr/v3/schedules/" + this.props.type + "s/" + this.props.line + "/" + this.state.points[2].slug + "/A+R")
        })
        .catch(rej => {
            this.setState({error: true});
        })
        .then(response => response.json())
        .then(data => {
            var schedule = data.result.schedules
            var val1, val2;

            if (schedule[0].message.includes("mn"))
                val1 = parseInt(schedule[0].message.substring(0, schedule[0].message.length - 2));
            else
                val1 = 0;
            if (schedule[1].message.includes("mn"))
                val2 = parseInt(schedule[1].message.substring(0, schedule[1].message.length - 2));
            else
                val2 = 0;
            this.setState(prev => ({
                times: [...prev.times, val2 - val1]
            }))
            if (schedule[0].destination !== schedule[Math.floor(schedule.length / 2)].destination)
            {
                if (schedule[Math.floor(schedule.length / 2)].message.includes("mn"))
                    val1 = parseInt(schedule[Math.floor(schedule.length / 2)].message.substring(0, schedule[Math.floor(schedule.length / 2)].message.length - 2));
                else
                    val1 = 0;
                if (schedule[Math.floor(schedule.length / 2) + 1].message.includes("mn"))
                    val2 = parseInt(schedule[Math.floor(schedule.length / 2) + 1].message.substring(0, schedule[Math.floor(schedule.length / 2) + 1].message.length - 2));
                else
                    val2 = 0;
                this.setState(prev => ({
                    times: [...prev.times, val2 - val1]
                }))
            }
            var total = 0;
            for(var i = 0; i < this.state.times.length; i++) {
                total += this.state.times[i];
            }
            var avg = total / this.state.times.length;
            this.setState({
                average: Math.round(avg),
                resolved: true
            })
        })
        .catch(rej => {
            this.setState({error: true});
        })

    }

    render()
    {
        if (this.state.error)
        {
            return (
                <Message className="average_time disabled">
                    <Message.Header className="perturbation-title">
                        Temps d'attente moyen
                    </Message.Header>
                    <p className="error">Données indisponibles</p>
                </Message>
            )
        }
        if (!this.state.resolved)
        {
            return (
                <Message className="average_time">
                    <Message.Header className="perturbation-title">
                        Temps d'attente moyen
                    </Message.Header>
                    <Loader active inline inverted/>
                </Message>
            )
        }
        return (
            <Message className={"average_time " + (this.state.average <= 5 ? "" : (this.state.average < 10 ? "warning" : "bad"))}>
                <Message.Header className="perturbation-title">
                    Temps d'attente moyen
                </Message.Header>
                <Statistic>
                  <Statistic.Value>{this.state.average}</Statistic.Value>
                  <Statistic.Label>Minutes</Statistic.Label>
                </Statistic>
            </Message>
        )
    }
}
