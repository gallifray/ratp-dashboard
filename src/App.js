import React, { Component } from 'react';
import MyMenu from './components/menu'
import './style/main.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid } from 'semantic-ui-react'
import Home from './pages/Home';
import Ligne from './pages/Ligne';
import VerticalMenu from './components/verticalMenu';


class App extends Component {
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
                                <Route path="/ligne/:type/:line" component={Ligne}/>
                            </Switch>
                        </Grid>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;
