import React, { Component, Fragment } from 'react'

export default class header extends Component {
    state = {
        owner:''
    }
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Mes Tableaux</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Informations</a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="mx-auto order-0">
                        <a className="navbar-brand mx-auto" href="/"><i className="fab fa-trello"></i>&nbsp;Trello</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Connexion</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">Deconnexion</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        )
    }
}
