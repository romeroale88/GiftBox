import './App.css'
import React, { useState } from 'react'
import Paquetes from "./components/Paquetes";
import Paquete from "./components/Paquete.jsx";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Registros from "./components/Registros";
import Header from "./components/Header"
import Footer from "./components/Footer"
import WhatsApp from './components/WhatsApp'
import Home from './components/Home'
import PaginaUsuario from './components/PaginaUsuario.js'
import EditUsuario from './components/EditUsuario'
import Carrito from './components/Carrito';
import CarritoPaquetes from './components/CarritoPaquetes';
import IniciarSesion from './components/IniciarSesion';
import EnviarEmail from './components/EnviarEmail'
import RecuperarPassword from './components/RecuperarPassword'
import { connect } from 'react-redux';
import carritoActions from './redux/actions/carritoActions';
import userActions from './redux/actions/userActions';
import Envio from './components/Envio';
import EnvioMensaje from './components/EnvioMensaje';
import Pago from './components/Pago';
import Regalo from './components/Regalo';
// import 'bootstrap/dist/css/bootstrap.min.css'
import ScrollToTop from './components/ScrollTop'
import QueEsGiftBox from './components/QueEsGiftBox'
import Admin from './components/Admin'


function App({ loggedUser, carritoDelLS, logFromLS }) {
  const [renderAgain, setRenderAgain] = useState(false)
  if (localStorage.getItem("token") && !loggedUser) { logFromLS(localStorage.getItem("token")) }
  if (localStorage.getItem("carrito")) {
    carritoDelLS(JSON.parse(localStorage.getItem("carrito")), JSON.parse(localStorage.getItem("total")))
  }

  var routes = null
  // if(localStorage.getItem("token") && !loggedUser){logFromLS(localStorage.getItem("token"))}
  if (!loggedUser && localStorage.getItem("token")) {

    logFromLS(localStorage.getItem('token'))
      .then(backToHome => {
        if (backToHome === '/') {
          setRenderAgain(!renderAgain)
        }
      })
      .catch(error => setRenderAgain(!renderAgain))
  }

  if (!loggedUser) {
    routes =
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/paquetes/" component={Paquetes} />
          <Route exact path="/carrito/" component={Carrito} />
          <Route exact path="/carritoPaquetes/" component={CarritoPaquetes} />
          <Route exact path="/paquete/:_id" component={Paquete} />
          <Route exact path="/registro" component={Registros} />
          <Route exact path="/iniciarsesion" component={IniciarSesion} />
          <Route exact path="/cambiar-password" component={RecuperarPassword} />
          <Route exact path="/recuperar-password" component={EnviarEmail} />
          <Route exact path="/queEsGiftBox" component={QueEsGiftBox}/>
          <Redirect to="/" />
        </Switch>
      </>
  }
  if (loggedUser) {
    routes =
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/paquetes/" component={Paquetes} />
          <Route exact path="/carrito/" component={Carrito} />
          <Route exact path="/carritoPaquetes/" component={CarritoPaquetes} />
          <Route exact path="/paquete/:_id" component={Paquete} />
          <Route exact path="/usuario" component={PaginaUsuario} />
          <Route exact path="/editUsuario" component={EditUsuario} />
          <Route exact path="/envio" component={Envio} />
          <Route exact path="/envioMensaje" component={EnvioMensaje} />
          <Route exact path="/queEsGiftBox" component={QueEsGiftBox}/>
          <Route exact path="/regalo" component={Regalo} />
          <Route exact path="/pago" component={Pago} />
          <Route exact path='/admin' component={Admin}/>
          <Redirect to="/" />
        </Switch>
      </>

  }
  return (
    <div className="App">
      <BrowserRouter >
        <ScrollToTop>
          <Header />
          
          {routes}

          <WhatsApp />
          <Footer />
        </ScrollToTop>
      </BrowserRouter>

    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userReducer.loggedUser
  }
}

const mapDispatchToProps = {
  logFromLS: userActions.logFromLS,
  carritoDelLS: carritoActions.carritoDelLS
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

