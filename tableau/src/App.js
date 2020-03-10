import React, { Component } from 'react'
import Data from './component/boards/Data'
import DataListe from './component/liste/Data'
import Login from './component/login/login'
import Logout from './component/login/logout'
import NoMatchPage from './component/404/NoMatchPage'
import './component/boards/board.css'
import './component/liste/liste.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Data} />
          <Route exact path='/board/:id' component={DataListe} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>

    )
  }
}
