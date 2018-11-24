import React, {Component} from 'react';
import '../style/main.css'
import { Popup, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

export default class Lines extends Component {
    render()
    {
        if (this.props.loaded)
        {
            return(
                this.props.data.map((line) =>
                <Link key={this.props.type + "/" + line.line} to={"/ligne/" + this.props.type + "/" + line.line + "/"}>
                    <Popup
                        position='bottom center'
                        size='tiny'
                        key={line.line}
                        trigger=
                        {

                            <div className="line-status">
                                <img
                                    className="line-logo"
                                    src={"/img/lignes/" + this.props.type + "/" + line.line + ".svg"}
                                    alt={"/img/lignes/" + this.props.type + "/" + line.line}
                                />
                                <br />
                                {
                                    line.slug === "normal"
                                    && <Icon name="circle" className="status-indicator"/>
                                || (line.slug === "normal_trav"
                                && <div><Icon name="circle" className="status-indicator"/>
                                <Icon name="warning sign" className="status-indicator orange"/></div>
                                || (line.title === "Trafic perturbé"
                                    && <Icon name="circle" className="status-indicator orange"/>
                                    || <Icon name="circle" className="status-indicator red"/>))
                                }
                            </div>
                        }
                    header={line.title}
                    content={line.message.replace("Ts", "Tous").charAt(0).toUpperCase() + line.message.slice(1)}
                    />
                </Link>
                )
            )
        }
        else return <h1 className="loading-message">Chargement...</h1>
    }
}
