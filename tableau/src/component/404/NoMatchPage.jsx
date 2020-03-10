import React, { Fragment } from 'react'
import './style.css'

export default function NoMatchPage() {

  return (
    // <Fragment>
    //   <div className="error">
    //     <div className="container-floud">
    //       <div className="col-xs-12 ground-color text-center">
    //         <div className="container-error-404">
    //           <div className="clip"><div className="shadow"><span className="digit thirdDigit">4</span></div></div>
    //           <div className="clip"><div className="shadow"><span className="digit secondDigit">0</span></div></div>
    //           <div className="clip"><div className="shadow"><span className="digit firstDigit">4</span></div></div>
    //           {/* <div className="msg">OUPS!<span className="triangle"></span></div> */}
    //         </div>
    //         <h2 className="h1">Désolé, Nous n'avons pas trouver la page demandé!</h2>
    //       </div>
    //     </div>
    //   </div>
    // </Fragment>
    <Fragment>
      <div id="notfound">
        <div class="notfound-bg"></div>
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Désolé, la page demandé n'a pas était trouvé</h2>
          <a href="/" class="home-btn">Retour sur le site</a>
          {/* <a href="https://colorlib.com/wp/free-404-error-page-templates/" class="contact-btn">404 by Colorlib</a> */}
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
