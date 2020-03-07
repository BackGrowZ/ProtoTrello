import React, { Component, Fragment } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import uuid from 'uuid'
import update from 'immutability-helper'


export default class Data extends Component {
  state = {
    modal: false
  }



  getBoards() {
    let token = "Bearer " + localStorage.getItem("jwt");
    axios.get('/api/v1/boards', { headers: { 'Authorization': token } })
      .then(response => {
        this.setState({ boards: response.data })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getBoards()
  }


  constructor(props, context) {
    super(props, context);

    this.state = {
      boards: [],
      newBoardLabel: ''
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ modal: false });
  }

  handleShow() {
    this.setState({ modal: true });
  }

  onChange = (e) => {
    this.setState({
      newBoardLabel: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.defaults.headers.common['Authorization'] = token
    if (this.state.newBoardLabel !== '') {
      axios.post('/api/v1/boards', {
        label: this.state.newBoardLabel,
        key: uuid()
      })
        .then(response => {
          const boards = update(this.state.boards, {
            $push: [response.data]
          })
          this.setState({
            boards: boards
          })
        })
        .catch(error => console.log(error))
      this.setState({
        newBoardLabel: '',
        modal: false
      })
    }
  }

  render() {
    return (
      <Fragment>
        <div className="App">
          <div className="container mt-5">
            <h1>Mes tableaux</h1>
            <div className="row">
              {this.state.boards.map((boards) => {
                return (
                  <div className="col-lg-3 mr-1 mt-1 py-4 text-center board" key={boards.id}>
                    <a href={'/board/' + boards.key} style={{ color: 'white' }}>
                      {boards.label}
                    </a>
                  </div>
                )
              })}

              <div className="col-lg-3 mr-1 mt-1 py-4 text-center creat-board">
                <p
                  onClick={this.handleShow}
                  href="#"
                  style={{
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fas fa-plus"></i>
                  &nbsp;Créer tableau
                </p>
              </div>

              <Modal show={this.state.modal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Créer un nouveau tableau</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                      <label htmlFor="recipient-name" className="col-form-label">Nom du tableau:</label>
                      <input type="text" className="form-control" name='nom' id="recipient-name" onChange={this.onChange} value={this.state.newBoardLabel} />
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Annuler
                  </Button>
                  <Button variant="primary" onClick={this.onSubmit}>
                    Créer tableau
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>

      </Fragment>
    )
  }
}
