import React, { Component, Fragment } from 'react'
import Header from './header/header.js'

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mt-5">
                    <div className="jumbotron">
                        <h1 className="display-4 text-center pb-5">Présentation</h1>
                        <p className="lead m-5 p-3 text-center" style={{backgroundColor:"grey"}}>
                            Ce site est mon premier projet qui utilise Ruby on Rails et React.<br />
                            C'est un prototype du site Trello.<br />
                        </p>
                        <h3>Liste des fonctionnalitées</h3>

                        <ul>
                            <li>Tableau</li>
                            <ol>
                                <li>Création de tableau</li>
                            </ol>
                            <li>Liste</li>
                            <ol>
                                <li>Création/Edition/Archivage des liste</li>
                            </ol>
                            <li>Carte</li>
                            <ol>
                                <li>Création/Edition/Archivage des cartes</li>
                                <li>Ajouter une description plus complette pour chaque carte</li>
                                <li>Déplacer les carte entre les liste</li>
                            </ol>
                            <li>Compte utilisateur</li>
                            <ol>
                                <li>Connexion</li>
                                <li>Déconnexion</li>
                            </ol>
                        </ul>

                        <h3>Todo</h3>
                        <ul>
                            <li>Création de compte</li>
                            <li>Partage de tableau</li>
                            <li>Assigner une carte a une personne</li>
                            <li>Création de role</li>
                            <ol>
                                <li><b>Créateur :</b> peux créer, éditer et archivé les cartes, les listes et les descriptions</li>
                                <li><b>Organisateur :</b> peux éditer et archivé les cartes, les listes et les descriptions sans possibilité de création</li>
                                <li><b>Rédacteur :</b> peux créer et voir les cartes, les listes et les descriptions sans possibilité d'edition ou d'archivage</li>
                                <li><b>Visiteur :</b> peux regarder les cartes, les listes et les descriptions sans possibilité d'edition, d'archivage ou de création</li>
                            </ol>
                        </ul>
                    </div>
                </div>
            </Fragment >
        )
    }
}
