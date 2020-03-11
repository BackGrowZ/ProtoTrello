import React, { Component, Fragment } from 'react'
import Header from '../header/header'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import uuid from 'uuid'
import axios from 'axios'
import update from 'immutability-helper'
import Select from 'react-select'

const options = []

export default class DataListe extends Component {

  getCard() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('/api/v1/cards', { headers: { 'Authorization': token } })
      .then(response => {
        var array = []

        for (let i = 0; i < response.data.length; i++) {
          if (window.location.pathname === "/board/" + response.data[i].board) {
            array.push(response.data[i])
          }
          this.setState({ cards: array })
        }
      })
      .catch(error => console.log(error))
  }

  getListe() {
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.get('/api/v1/listes', { headers: { 'Authorization': token } })
      .then(response => {
        var array = []

        for (let i = 0; i < response.data.length; i++) {
          if (window.location.pathname === "/board/" + response.data[i].board) {
            array.push(response.data[i])
          }
          this.setState({ listes: array })
        }
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getListe()
    this.getCard()
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      listes: [],
      cards: [],
      boardID: window.location.pathname.slice(7),
      listeChangeTitle: '',
      listeChangeId: '',
      listeAdd: '',
      titleEdit: '',
      listeKey: '',
      cardID: '',
      listeID: '',
      labelOfAllListe: '',
      cardDescription: '',
      selectedOption: null,
    }

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.handleShowEditeTitle = this.handleShowEditeTitle.bind(this)
    this.handleCloseEditeTitle = this.handleCloseEditeTitle.bind(this)

    this.handleShowAddCard = this.handleShowAddCard.bind(this)
    this.handleCloseAddCard = this.handleCloseAddCard.bind(this)

    this.handleShowEditCard = this.handleShowEditCard.bind(this)
    this.handleCloseEditCard = this.handleCloseEditCard.bind(this)
  }


  handleClose() {
    this.setState({
      modal: false,
      listeAdd: ''
    })
  }

  handleShow() {
    this.setState({ modal: true })
  }

  handleCloseEditCard() {
    this.setState({
      modalEditCard: false,
      cardID: '',
      cardTitle: '',
      cardDescription: '',
      selectedOption: null,
      listeChangeId: ''
    })
  }

  handleShowEditCard = (event) => {
    this.nameOfAllListe()
    const data = event.target
    let cardDesc = data.getAttribute('data-carddesc')
    if (cardDesc == null) {
      cardDesc = ""
    }

    this.setState({
      selectedOption: {
        label: data.getAttribute('data-listelabel'),
        value: data.getAttribute('data-listekey')
      },
      modalEditCard: true,
      cardTitle: data.getAttribute('data-cardlabel'),
      listeChangeId: data.id,
      cardDescription: cardDesc,
      cardID: data.getAttribute('data-cardid')
    })
  }

  onChange = (e) => {
    this.setState({
      listeAdd: e.target.value
    })
  }

  onChangeCardTitle = (e) => {
    this.setState({
      cardTitle: e.target.value
    })
  }

  onChangeCardDescription = (e) => {
    this.setState({
      cardDescription: e.target.value
    })
  }




  onSubmit = (e) => {
    e.preventDefault()

    let token = "Bearer " + localStorage.getItem("jwt")
    const owner = localStorage.getItem("owner")
    axios.defaults.headers.common['Authorization'] = token
    const position = this.state.listes.length
    if (this.state.listeAdd !== '' && owner !== null) {
      axios.post('/api/v1/listes', {
        key: uuid(),
        label: this.state.listeAdd,
        board: this.state.boardID,
        position: position.toString(),
        owner: owner
      })
        .then(response => {
          const listes = update(this.state.listes, {
            $push: [response.data]
          })
          this.setState({
            listes: listes
          })
        })
        .catch(error => console.log(error))
      this.setState({
        listeAdd: '',
        modal: false
      })
    }
  }

  onSubmitCardAdd = (e) => {
    e.preventDefault()
    let token = "Bearer " + localStorage.getItem("jwt")
    const owner = localStorage.getItem("owner")
    axios.defaults.headers.common['Authorization'] = token
    const position = this.state.cards.length
    if (this.state.cardTitle !== '') {

      axios.post('/api/v1/cards', {
        label: this.state.cardTitle,
        board: this.state.boardID,
        liste: this.state.listeKey,
        position: position,
        owner: owner,
        key: uuid()
      })
        .then(response => {
          const cards = update(this.state.cards, {
            $push: [response.data]
          })
          this.setState({
            cards: cards
          })
        })
        .catch(error => console.log(error))

      this.setState({
        cardTitle: '',
        listeChangeId: '',
        listeKey: '',
        modalAddCard: false
      })
    }
  }

  handleCloseAddCard() {
    this.setState({
      modalAddCard: false,
      titleEdit: '',
      listeChangeId: '',
      listeKey: '',
      cardTitle: ''
    })
  }

  handleShowAddCard = (event) => {
    this.setState({
      modalAddCard: true,
      titleEdit: event.target.name,
      listeChangeId: event.target.id,
      listeKey: event.target.getAttribute('data-liste-key')
    })
  }

  handleCloseEditeTitle() {
    this.setState({
      modalEditeTitle: false,
      titleEdit: '',
      listeID: '',
      listeChangeId: ''
    })
  }

  handleShowEditeTitle = (event) => {
    this.setState({
      modalEditeTitle: true,
      titleEdit: event.target.name,
      listeChangeId: event.target.id,
      listeID: event.target.getAttribute('data-liste-id')
    })
  }

  onChangeEditTitle = (e) => {
    this.setState({
      titleEdit: e.target.value
    })
  }

  onSubmitEditeTitle = (id) => {
    if (this.state.titleEdit !== '' && this.state.listeChangeId !== '') {
      let token = "Bearer " + localStorage.getItem("jwt")
      axios.defaults.headers.common['Authorization'] = token
      axios.put(`/api/v1/listes/${id}`, { liste: { label: this.state.titleEdit } })
        .then(response => {
          const listeIndex = this.state.listes.findIndex(x => x.id === response.data.id)
          const liste = update(this.state.listes, {
            [listeIndex]: { $set: response.data }
          })
          this.setState({
            listes: liste,
            cardTitle: '',
            listeChangeId: '',
            listeID: '',
            modalEditeTitle: false
          })
        })
        .catch(error => console.log(error))
    }
  }

  onSubmitEditeCard = (id) => {
    if (this.state.cardTitle !== '' && this.state.listeChangeId !== '') {
      let token = "Bearer " + localStorage.getItem("jwt")
      axios.defaults.headers.common['Authorization'] = token
      axios.put(`/api/v1/cards/${id}`, {
        card: {
          label: this.state.cardTitle,
          liste: this.state.selectedOption.value,
          description: this.state.cardDescription
        }
      })
        .then(response => {
          const cardIndex = this.state.cards.findIndex(x => x.id === response.data.id)
          const card = update(this.state.cards, {
            [cardIndex]: { $set: response.data }
          })
          this.setState({
            cards: card,
            cardTitle: '',
            listeChangeId: '',
            cardID: '',
            modalEditCard: false
          })
        })
        .catch(error => console.log(error))
    }
  }

  handleDeleteListe = () => {
    const id = this.state.listeID
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.defaults.headers.common['Authorization'] = token
    axios.put(`/api/v1/listes/${id}`, { liste: { board: this.state.boardID + '-Archive' } })
      .then(response => {
        const listeIndex = this.state.listes.findIndex(x => x.id === response.data.id)
        const liste = update(this.state.listes, {
          [listeIndex]: { $set: response.data }
        })
        this.setState({
          listes: liste,
          cardTitle: '',
          listeChangeId: '',
          titleEdit: '',
          listeID: '',
          modalEditeTitle: false
        })
      })
      .catch(error => console.log(error))
  }

  handleDeleteCard = () => {
    const id = this.state.cardID
    axios.put(`/api/v1/cards/${id}`, { card: { board: this.state.boardID + '-Archive' } })
      .then(response => {
        const cardIndex = this.state.cards.findIndex(x => x.id === response.data.id)
        const card = update(this.state.cards, {
          [cardIndex]: { $set: response.data }
        })
        this.setState({
          cards: card,
          cardID: '',
          cardTitle: '',
          listeChangeId: '',
          modalEditCard: false
        })
      })
      .catch(error => console.log(error))
  }

  nameOfAllListe = () => {
    const nameOfListe = []
    while (options.length > 0) { options.pop() }

    for (let i = 0; i < this.state.listes.length; i++) {
      nameOfListe.push(this.state.listes[i].label)
      options.push({ value: this.state.listes[i].key, label: this.state.listes[i].label })

    }
    this.setState({ labelOfAllListe: nameOfListe })
  }

  handleChangeSelect = selectedOption => {
    this.setState(
      { selectedOption }
    )
  }


  render() {
    const { selectedOption } = this.state
    return (
      <Fragment>
        <Header />
        <div className='board-list pl-2'>

          {this.state.listes.map((listes) => {
            if (window.location.pathname === "/board/" + listes.board) {


              return (
                <div className="col-lg-3 mr-1 mt-1 py-1 liste" key={listes.key}>
                  <form className="form-inline">
                    <a
                      href="#EditListe"
                      className='titleOfListe'
                      style={{ color: 'black', cursor: 'pointer' }}
                      name={listes.label}
                      id={listes.position}
                      data-liste-id={listes.id}
                      onClick={this.handleShowEditeTitle}
                    >
                      {listes.label}
                    </a>
                  </form>

                  {this.state.cards.map((cards) => {
                    if (listes.key === cards.liste && cards.board === this.state.boardID) {
                      return (
                        <div className="carte pl-2 mt-1" key={cards.key}>
                          <span>{cards.label}</span>
                          <a
                            href={'#' + listes.position}
                            onClick={this.handleShowEditCard}
                            style={{ cursor: "pointer", float: "right" }}
                            role="img"
                          >
                            <i
                              className="fas fa-edit"
                              id={cards.position}
                              data-cardid={cards.id}
                              data-cardlabel={cards.label}
                              data-listelabel={listes.label}
                              data-carddesc={cards.description}
                              data-listekey={listes.key}
                            >
                            </i>
                          </a>
                        </div>
                      )
                    } else { return false }
                  })}
                  <div className="addCarte mt-2 texte-center" id={listes.position} data-liste-key={listes.key} onClick={this.handleShowAddCard} style={{ cursor: 'pointer' }}><b>+</b> Ajouter une autre carte</div>
                </div>
              )
            } else { return false }
          })}

          <div className="col-lg-3 mr-1 mt-1 py-1 addListe">
            <div className="mt-2 texte-center" onClick={this.handleShow} style={{ cursor: 'pointer' }}><b>+</b> Ajouter une autre liste</div>
          </div>
        </div>

        {/* Modal ADD Liste */}
        <Modal show={this.state.modal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Créer une nouvelle liste</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmit} >
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Nom de la liste:</label>
                <input type="text" className="form-control" name='nom' id={this.state.listeChangeTitle} onChange={this.onChange} value={this.state.listeAdd} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.onSubmit}>Créer liste</Button>
            <Button variant="secondary" onClick={this.handleClose}>Annuler</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Edit Liste */}
        <Modal show={this.state.modalEditeTitle} onHide={this.handleCloseEditeTitle}>
          <Modal.Header closeButton>
            <Modal.Title>Edité la liste</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmitEditeTitle} >
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Nom de la liste:</label>
                <input type="text" className="form-control" name={this.props.label} id={this.state.listeChangeTitle} onChange={this.onChangeEditTitle} value={this.state.titleEdit} />
              </div>
            </form>
            <center>
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.onSubmitEditeTitle(this.state.listeID)}>Sauvegarder</Button>
            <Button variant="danger" onClick={this.handleDeleteListe}>Archiver</Button>
            <Button variant="secondary" onClick={this.handleCloseEditeTitle}>Annuler</Button>
          </Modal.Footer>
        </Modal>


        {/* Modal Add Card */}
        <Modal show={this.state.modalAddCard} onHide={this.handleCloseAddCard}>
          <Modal.Header closeButton>
            <Modal.Title>Créer une nouvelle Carte</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmitCardAdd} >
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Nom de la carte:</label>
                <input type="text" className="form-control" name='nom' id={this.state.listeChangeTitle} onChange={this.onChangeCardTitle} value={this.state.cardTitle} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.onSubmitCardAdd}>Créer carte</Button>
            <Button variant="secondary" onClick={this.handleCloseAddCard}>Annuler</Button>
          </Modal.Footer>
        </Modal>


        {/* Modal Edit Card */}
        <Modal show={this.state.modalEditCard} onHide={this.handleCloseEditCard}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier la carte</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmitEditeCard} >
              <div className="form-group">
                <label htmlFor="recipient-name" className="col-form-label">Nom de la carte:</label>
                <input type="text" className="form-control" name={this.props.label} id={this.state.listeChangeTitle} onChange={this.onChangeCardTitle} value={this.state.cardTitle} />
              </div>
              <label className="col-form-label">Déplacer dans la Liste :</label>
              <Select
                value={selectedOption}
                onChange={this.handleChangeSelect}
                options={options}
              />
              <label className="col-form-label">Description :</label>
              <textarea className="form-control" value={this.state.cardDescription} onChange={this.onChangeCardDescription} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.onSubmitEditeCard(this.state.cardID)}>Sauvegarder</Button>
            <Button variant="danger" onClick={this.handleDeleteCard}>Archiver</Button>
            <Button variant="secondary" onClick={this.handleCloseEditCard}>Annuler</Button>
          </Modal.Footer>
        </Modal>

      </Fragment>
    )
  }
}
