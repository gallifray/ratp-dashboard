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
                    <div className="content_left">
                        <VerticalMenu />
                    </div>
                    <div className="content_right">
                        <MyMenu />
                        <div className="main-content">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/ligne/:type/:line" component={Ligne}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>

        );
    }
}

export default App;
