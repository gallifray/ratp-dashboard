import React, { Component } from 'react';
import { Grid, Message, Icon, Dimmer, Loader, Statistic } from 'semantic-ui-react'
import ImageZoom from 'react-medium-image-zoom'
import '../style/page_ligne.css'
import AverageTime from '../components/averageTime'
import NextPassagesContainer from '../components/nextPassages'
import { Doughnut } from 'react-chartjs-2';


export default class Ligne extends Component {
    constructor(props) {
        super(props);
        var type = this.props.match.params.type;
        var line = this.props.match.params.line;
        this.state =
            {
                trafic: null,
                directions: "",
                loaded: false
            }
    }


    componentWillMount() {
        var type = this.props.match.params.type;
        var line = this.props.match.params.line;


        var apiRequest1 = fetch("https://api-ratp.pierre-grimaud.fr/v3/lines/" + type + "s/" + line)
            .then(function (response) {
                return response.json()
            });
        var apiRequest2 = fetch("https://api-ratp.pierre-grimaud.fr/v3/traffic/" + type + "s/" + line)
            .then(function (response) {
                return response.json()
            });
        var apiRequest3 = fetch("https://api-ratp.pierre-grimaud.fr/v3/stations/" + type + "s/" + line)
            .then(function (response) {
                return response.json()
            });
        var apiRequest4 = fetch("https://ratp-api.gallifray.fr/api/count/" + type + "/" + line)
            .then(function (response) {
                return response.json()
            });
        var that = this;
        Promise.all([apiRequest1, apiRequest2, apiRequest3, apiRequest4]).then(function (values) {
            that.setState({
                directions: values[0].result[0].directions,
                trafic: values[1].result,
                stations: values[2].result.stations,
                stats: values[3],
                loaded: true
            });
        });

    }
    render() {
        var type = this.props.match.params.type;
        var line = this.props.match.params.line;
        if (!this.state.loaded) {
            return (
                <Dimmer active inverted style={{ height: "100vh", backgroundColor: "#ededed" }}>
                    <Loader inverted>Chargement...</Loader>
                </Dimmer>
            )
        }
        return (
            <Grid stackable columns={2} className="page_ligne" >
                <Grid.Column computer={type === "rer" ? 16 : 12} tablet={16}>
                    <Message>
                        <Message.Header>
                            <img alt={type + "-logo"} src={"/img/" + type + ".svg"} />
                            <img alt={type + "/" + line + "-logo"} src={"/img/lignes/" + type + "/" + line + ".svg"} />
                            <div className="float_indicator">
                                {
                                    this.state.trafic.slug === "normal"
                                    && <Icon name="circle" className="status-indicator" />
                                    || (this.state.trafic.slug === "normal_trav"
                                        && <div><Icon name="circle" className="status-indicator" />
                                            <Icon name="warning sign" className="status-indicator orange" /></div>
                                        || (this.state.trafic.title === "Trafic perturbé"
                                            && <Icon name="circle" className="status-indicator orange" />
                                            || <Icon name="circle" className="status-indicator red" />))
                                }
                            </div>
                            <br />
                            <span className="directions">
                                {this.state.directions}
                            </span>
                        </Message.Header>
                        <ImageZoom
                            image={{
                                src: "/img/plans/" + type + "/" + line + ".gif",
                                alt: 'Plan de la ligne',
                                className: 'img',
                                style: { width: '100%' }
                            }}
                            zoomImage={{
                                src: "/img/plans/" + type + "/" + line + ".gif",
                                alt: 'Plan de la ligne'
                            }}
                        />
                    </Message>
                    <Grid stackable>
                        <Grid.Column largeScreen={6} computer={8}>
                            <Message className={"trafic " + (this.state.trafic.slug === "normal" ? "" : (this.state.trafic.slug === "normal_trav" || this.state.trafic.title === "Trafic perturbé" ? "warning" : "bad"))}>
                                <Message.Header className="perturbation-title">
                                    Etat actuel du trafic
                                    </Message.Header>
                                <b>
                                    {this.state.trafic.title}
                                </b>
                                <br />
                                <div className="trafic_message">
                                    {this.state.trafic.message.charAt(0).toUpperCase() + this.state.trafic.message.slice(1)}
                                </div>
                            </Message>
                        </Grid.Column>
                        <Grid.Column largeScreen={6} computer={8}>
                            {
                                type !== "rer" &&
                                <AverageTime type={type} line={line} />
                            }
                        </Grid.Column>
                        {
                            type !== "rer" &&
                            <Grid.Column computer={5} tablet={16}>
                                <NextPassagesContainer line={line} type={type} />
                            </Grid.Column>
                        }
                    </Grid>

                </Grid.Column>

                <Grid.Column computer={4} tablet={16} className="center">
                    <Message>
                        <Message.Header className="perturbation-title">
                            Statistiques
                                </Message.Header>
                        <b>
                            État du traffic depuis le 18 mars 2019:
                                </b>
                        <br />
                        <br />
                        <div className="trafic_message center">
                            <Doughnut height={300} data={{
                                labels: ['Normal', 'Perturbé', 'Interrompu'],
                                datasets: [{
                                    label: '# of Votes',
                                    data: [this.state.stats[0].normal, this.state.stats[0].alerte, this.state.stats[0].critique],
                                    backgroundColor: [
                                        '#8bc34a',
                                        '#fb8c00',
                                        '#f44336',
                                    ],
                                    hoverBackgroundColor: [
                                        '#8bc34add',
                                        '#fb8c00dd',
                                        '#f44336dd',
                                    ],
                                    borderWidth: 0
                                }]
                            }} options={{
                                tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem, data) {
                                            var dataset = data.datasets[tooltipItem.datasetIndex];
                                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                                            var total = meta.total;
                                            var currentValue = dataset.data[tooltipItem.index];
                                            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                                            return percentage + '%';
                                        },
                                        title: function (tooltipItem, data) {
                                            return data.labels[tooltipItem[0].index];
                                        }
                                    }
                                }
                            }} />
                            <Statistic>
                                <Statistic.Value>{(parseFloat(this.state.stats[0].normal) / parseFloat(this.state.stats[0].total) * 100).toPrecision(4)}%</Statistic.Value>
                                <Statistic.Label>de traffic normal</Statistic.Label>
                            </Statistic>
                        </div>
                    </Message>
                </Grid.Column>
            </Grid>

        );
    }
}
