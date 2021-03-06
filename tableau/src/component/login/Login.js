import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Header from '../header/header.js'

class Login extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let token = "Bearer " + localStorage.getItem("jwt")
    axios.defaults.headers.common['Authorization'] = token
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const request = { "auth": { "email": email, "password": password } }
    axios.post('/api/v1/user_token', request)
      .then(response => {
        localStorage.setItem("jwt", response.data.jwt)
      })
      .catch(error => console.log('error', error))

    axios.get('/api/v1/users')
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].email === email) {
            localStorage.setItem("owner", response.data[i].owner)
          }
        }
        this.props.history.push("/")
      })
      .catch(error => console.log('error', error))
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <div className="text-center mt-5" style={{ width: 500, margin: 'auto' }}>
            <form onSubmit={this.handleSubmit} className="form-signin">
              <img className="mb-4" src="https://arteoconseil.fr/wp-content/uploads/2018/02/Trello-logo-.png" alt="" width="300" height="90" />
              <h1 className="h3 mb-3 font-weight-normal">Connectez vous</h1>
              <label htmlFor="email" className="sr-only">Email</label>
              <input type="email" id="email" name="email" className="form-control" placeholder="Email" />
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input type="password" id="password" name='password' className="form-control" placeholder="Mot de passe" />
              <button className="btn btn-lg btn-primary btn-block">Connexion</button>
            </form>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body text-center">Acces test n°1</div>
                <ul className="ml-5 pb-2">
                  <li><b>Email: </b>trello@mail.com</li>
                  <li><b>Mot de passe: </b>trello</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body text-center">Acces test n°2</div>
                <ul className="ml-5 pb-2">
                  <li><b>Email: </b>mdp@mail.com</li>
                  <li><b>Mot de passe: </b>mdp</li>
                </ul>
              </div>
            </div>
          </div>


        </div>
      </Fragment>
    )
  }
}


export default Login
