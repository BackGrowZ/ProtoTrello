import React, { Component } from 'react'
import Data from './component/boards/Data'
import DataListe from './component/liste/Data'
import Login from './component/login/login'
import Logout from './component/login/logout'
import './component/boards/board.css'
import './component/liste/liste.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Data}/>
        <Route exact path='/board/:id' component={DataListe}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/logout' component={Logout}/>
      </Router>

    )
  }
}
