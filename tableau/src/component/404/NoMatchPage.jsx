import React, { Fragment } from 'react'
import './style.css'

export default function NoMatchPage() {

  return (
    <Fragment>
      <div id="notfound">
        <div class="notfound-bg"></div>
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Désolé, la page demandé n'a pas était trouvé</h2>
          <a href="/" class="home-btn">Retour sur le site</a>
          <div class="notfound-social">
            <a href="#Facebook"><i class="fab fa-facebook"></i></a>
            <a href="#Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#Github"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
