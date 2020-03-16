import React, { Component } from 'react'
import Home from './component/boards/Home'
import DataListe from './component/liste/Data'
import Login from './component/login/Login'
import Logout from './component/login/Logout.jsx'
import NoMatchPage from './component/404/NoMatchPage.jsx'
import './component/boards/board.css'
import './component/liste/liste.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class App extends Component {
  render() {
    return  <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/board/:id' exact component={DataListe} />
          <Route path='/login' exact component={Login} />
          <Route path='/logout' exact component={Logout} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
  }
}
