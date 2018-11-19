import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import MyMenu from './components/menu'
import './style/main.css'
import {Grid, Message, Icon, Container} from 'semantic-ui-react'

class Lines extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
        this.props.metros.map((line) => <Grid.Column>
            <div className="line-status">
                <img className="line-logo " src={"./img/lignes/" + line.line + ".svg"}/>
                <br />
                {
                    line.slug === "normal"
                    && <Icon name="circle" className="status-indicator"/>
                    || <Icon name="circle" className="status-indicator red"/>
                }
            </div>
        </Grid.Column>)
    )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "loaded": false
        }
    }
    componentDidMount() {
        fetch('https://api-ratp.pierre-grimaud.fr/v3/traffic/metros').then(response => response.json()).then(data => this.setState({"metros": data.result.metros, "loaded": true}));
    }
    render() {
        if (this.state.loaded)
        {
        return (<div>
            <MyMenu/>
            <div className="content">
                <Container>
                    <Message>
                        <Message.Header>
                            Metros
                        </Message.Header>
                        <Grid centered stackable="stackable" columns={16}>
                            <Lines metros={this.state.metros} />
                        </Grid>
                    </Message>
                </Container>
            </div>
        </div>);
        }
        return <h1>Loading</h1>
    }
}

export default App;
