import React, { Fragment, Component } from 'react'
import Carte from '../carte/Carte'

export default class Liste extends Component {
  render() {
    return (
      <Fragment>
        <div className="col-lg-3 mr-1 mt-1 py-1 liste" id={this.props.position}>
          <form className="form-inline">
            <a
              type="text"
              href="#EditListe"
              className='titleOfListe'
              style={{ color: 'black', cursor: 'pointer' }}
              name={this.props.label}
              id={this.props.position}
              onClick={this.props.handleShowEditeTitle}
            >
              {this.props.label}
            </a>
          </form>
          {this.props.card.map(card => (
              <Carte
                key={card.id}
                id={card.id}
                label={card.label}
                position={card.position}
                idListe={this.props.position}
                handleShowEditCard={this.props.handleShowEditCard}
              />
            ))
          }
          <div className="addCarte mt-2 texte-center" id={this.props.position} onClick={this.props.handleShowAddCard} style={{ cursor: 'pointer' }}><b>+</b> Ajouter une autre carte</div>
        </div>
      </Fragment>
    )
  }
}
