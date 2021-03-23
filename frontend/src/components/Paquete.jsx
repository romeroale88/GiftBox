import '../styles/paquete.css'
import { connect } from 'react-redux'
import paqueteActions from '../redux/actions/paqueteActions'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { BsArrowLeft, BsFillPeopleFill, BsBuilding, BsGiftFill, BsIntersect } from "react-icons/bs";
import { FaRegFrownOpen } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { FaMapMarkerAlt,FaRegPaperPlane } from "react-icons/fa";
import Swal from 'sweetalert2'
import Comentario from './Comentario'
import carritoActions from '../redux/actions/carritoActions'
import Opiniones from './Opiniones'
import withReactContent from 'sweetalert2-react-content'
import productoActions from '../redux/actions/productoActions'
import Loader from "../components/Loader";

const Paquete = ({productosDelpaquete,obtenerProductosPorPaquete ,loggedUser, match, paquetePorId, obtenerPaquetePorId, enviarValoracion, agregarComentario, todosLosPaquetes, history,  agregarAlCarrito}) => {
  const [valor, setValor] = useState(0);
  const [ultimoValor, setUltimoValor] = useState(0);
  const [visible, setVisible] = useState(false)
  const [comentario, setComentario] = useState({})
  useEffect(() => { 
    if(paquetePorId){obtenerProductosPorPaquete(paquetePorId._id)}
  }, [])
  console.log(productosDelpaquete)
  const productos = [
    {
      titulo: 'Spa El Roble, Villa Crespo',
      descripcion: 'Especialmente diseñado para el bienestar físico, mental y espiritual. Un espacio creado para lograr calidez y armonía y quienes lo visiten puedan obtener una experiencia única.',
      imagen: 'https://fotos.subefotos.com/846d622569fe9ff8dc1d5a95a9d05106o.png',
      lugar: 'Malabia 429'
    },

    {
      titulo: 'Spa El Roble, Villa Crespo',
      descripcion: 'Especialmente diseñado para el bienestar físicgadf, mental y espiritual. Un espacio creado para lograr calidez y armonía y quienes lo visiten puedan obtener una experiencia única.',
      imagen: 'https://fotos.subefotos.com/846d622569fe9ff8dc1d5a95a9d05106o.png',
      lugar: 'Malabia 4291'
    }
    ,

    {
      titulo: 'Spa El Roble, Villa Crespo',
      descripcion: 'Especialmente diseñado para el bienestar físico, mental y espiritual. Un espacio creado para lograr calidez y armonía y quienes lo visiten puedan obtener una experiencia únicaaaaaaaaaaaaaaaaaaaaaaaaaa.',
      imagen: 'https://fotos.subefotos.com/846d622569fe9ff8dc1d5a95a9d05106o.png',
      lugar: 'Malabia 4293'
    }
    ,

    {
      titulo: 'Spa El Roble, Villa Crespo',
      descripcion: 'Especialmente diseñado para el bienestar físidfgafdgdfco, mental y espiritual. Un espacio creado para lograr calidez y armonía y quienes lo visiten puedan obtener una experiencia única.',
      imagen: 'https://fotos.subefotos.com/846d622569fe9ff8dc1d5a95a9d05106o.png',
      lugar: 'Malabia 4295'
    }
    ,

    {
      titulo: 'Spa El Roble, Villa Crespo',
      descripcion: 'Especialmente diseñado para el bienestar físico, mental y espiritual. Un espacio creado para lograr calidez y armonía y quienes lo visiten puedan obtener una expehdfghdfgagadfgadfgdfgriencia única.',
      imagen: 'https://fotos.subefotos.com/846d622569fe9ff8dc1d5a95a9d05106o.png',
      lugar: 'Malabia 429'
    }
  ]
  document.getElementById("inputComentario")


  useEffect(async () => {
    if (valor !== 0 && loggedUser) {
      await enviarValoracion(match.params._id, { idUsuario: loggedUser.id, valor })
      obtenerPaquetePorId(match.params._id)
    }
  }, [valor])

  const id = match.params._id
  useEffect(() => {
    var paquete = obtenerPaquetePorId(match.params._id)
    // if (paquetePorId) {
    //   if (loggedUser && paquetePorId) {
    //     var aux = { valor: 0 }
    //     aux = paquetePorId.valoracion.find(valoracionUsuario => valoracionUsuario.idUsuario === loggedUser.id)
    //     if (aux.valor !== null && aux !== undefined) {

    //       setUltimoValor(aux.valor)
    //     }
    //   }
    // }
  }, [match.params._id])

  const leerInput = (e) => {
    const nombre = e.target.name
    const nuevoComentario = e.target.value
    setComentario({
      ...comentario,
      paqueteId: paquetePorId._id,
      token: loggedUser.token,
      imagenUsuario: loggedUser.imagen,
      nombreUsuario: loggedUser.nombre,
      [nombre]: nuevoComentario
    })
  }

  const enviarComentario = (e) => {
    if (!loggedUser) {
      Swal.fire({
        title: "Oops!",
        text: "Tenés que estar logueado para opinar sobre el paquete!",
        icon: "warning",
        showCloseButton: true,
        confirmButtonColor: "#ff0000",
        confirmButtonText: "Logueame!",
        cancelButtonText: "X",
        background: "#fafafa",
        iconColor: "tomato",
        backdrop: "rgba(80, 80, 80, 0.3)",
      })
      .then((result) => {
        if (result.value) {
          history.push("/iniciarsesion") 
        }
        return false;
      })  
    } else if (!comentario.comentarioUsuario) {
      Swal.fire({
        title: "Oops!",
        text: "No puedes enviar un comentario vacío!",
        icon: "warning",
        background: "#fafafa",
        iconColor: "tomato",
        backdrop: "rgba(80, 80, 80, 0.3)",
      })
    } else {
      e.preventDefault()
      agregarComentario(comentario)
      document.getElementById("inputComentario").value = ""
    }

  }
  if (!paquetePorId) { return <Loader/> }
  function agregarCarrito() {
    agregarAlCarrito(paquetePorId)

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <p className="popup" style={{ color: "black" }}>Agregado a tu carrito!</p>,
      icon: 'success',
      toast: true,
      timer: 1300,
      timerProgressBar: true,
      showConfirmButton: false,
      width: 200,
      background: '#d8f6d3',
      iconColor: '#2fbc13'

    })
    if (!paquetePorId) { return <Loader/> }
  }
  paquetePorId && console.log(paquetePorId)
  return (
    <>
      {paquetePorId &&
        <>
          <div className="paqueteBanner"><Link to="/" style={{ display: 'flex', alignItems: 'center' }}><BsArrowLeft className="paqueteIcono" /><span>Regresar a la página principal</span></Link></div>
          <div className="paqueteContainer">
            <h2 className="tituloPaquete">{paquetePorId.nombre}</h2>
            <p className="descripcionPaquete">{paquetePorId.descripcion}</p>
            <div className="paqueteImgInfo">
              <div className="paqueteImg" style={{
                backgroundImage: `url(${paquetePorId.imagen})`
              }}>
              </div>
              <div className="paqueteInfo">
                <h4>Acerca de esta GiftBox</h4>
                <div className="cantidadDePersonas"><BsFillPeopleFill className="icon" /> Para <span>{paquetePorId.cantidadPersonas}</span> persona/s</div>
                <div className="categoria"><BsIntersect className="icon" /> Categoria: <span>{paquetePorId.categoria}</span></div>
                <div className="ubicacion"><BsBuilding className="icon" /> Ubicacion: <span>{paquetePorId.ubicacion}</span></div>
                <div className="vendidos"><BsGiftFill className="icon" /> Cantidad de paquetes vendidos: <span>{paquetePorId.cantidadVendidos.length}</span></div>
                <div className="linea"></div>
                <div className="formatodeRegalo">
                  <h5>Formatos de Regalo:</h5>
                  <p className="regaloDigital">Regalo digital</p>
                  <p className="envioPorEmail">Envío por email</p>
                </div>
                <div className="linea"></div>
                <div className="precio">$ {paquetePorId.precio}
                  <a href="https://www.mercadopago.com.ar/ayuda/medios-de-pago-cuotas-promociones_264" target="blank">ver cuotas</a>
                </div>
                <button className="comprarPaquete"  onClick={agregarCarrito}>Comprar esta GiftBox</button>
                <div className="mediosdepago"></div>
              </div>
            </div>
          </div>
          <div className="valoracionContainer">
            <div className="valoracion">
              <span>{(paquetePorId.promedio).toFixed(2)}</span>
              <ReactStars count={5} onChange={setValor}
                size={50} activeColor="#ffd700" isHalf={true} />
            </div>
            <p className="verComentarios" onClick={() => setVisible(!visible)}>Ver comentarios del paquete</p>
            <img src="https://fotos.subefotos.com/af333790da6d3696dec1241bd0c55308o.png" alt="estrellas" />
          </div>
          {visible &&
            <>
              <div className="cajaDeComentarios">
                <h2 className="tituloComentarios">Opiniones:</h2>
                <div className="filterInput">
                  <input id="inputComentario" type="text" autoComplete="off" name="comentarioUsuario" placeholder="Ingresá tu comentario..." onChange={leerInput} disabled={!loggedUser ? true : false} />
                  <div id="enviar"className="centerCenterRow searchButton"onClick={enviarComentario}><span><FaRegPaperPlane/></span></div>
                </div>
                {paquetePorId.opiniones.length === 0 && 
                  <div className="sinComentarios">
                    <h5>Este paquete no tiene comentarios aún! </h5>
                    <span><FaRegFrownOpen/></span>
                  </div>}
                {paquetePorId.opiniones.map(comentario => {
                  return <Comentario comentario={comentario} key={paquetePorId._id} paqueteId={paquetePorId._id} />
                })}
                <p className="verComentarios" onClick={() => setVisible(!visible)} style={{ margin: '2vh', alignSelf: 'flex-end' }}>Cerrar Comentarios </p>
              </div>
            </>}
          <div className="productosContainer">
            <div className="encabezado">
              <h3>Dentro del paquete: </h3>
              <p>Tu agasajado va a poder disfrutar de estos <span>{productos.length}</span> productos</p>
            </div>
            <div className="productos">{
              productosDelpaquete.map(producto => {
                console.log(producto)
                return (
                  <>
                    <div className="cardProducto" key={`cardProd${producto._id}`}>
                      <img src={producto.imagen} alt="" style={{ width: '100%', height: '25vh'}} />
                      <div className="infoProducto">
                        <div className="tituloProducto">
                          <h4>{producto.nombre}</h4>
                          <BsFillPeopleFill className="iconCard" />
                        </div>
                          <h5>{producto.descripcion}</h5>
                        <p className="lugarProducto"><FaMapMarkerAlt className="iconCard" /> {producto.ubicacion}</p>
                      </div>
                    </div>
                  </>
                )
              })
            }</div>
          </div>
        </>
      }
    </>
  )

}

const mapStateToProps = state => {
  return {
    todosLosPaquetes: state.paqueteReducer.todosLosPaquetes,
    paquetePorId: state.paqueteReducer.paquetePorId,
    loggedUser: state.userReducer.loggedUser,
    productosDelpaquete: state.productoReducer.productosDelpaquete
  }
}

const mapDispatchToProps = {
  obtenerTodosLosPaquetes: paqueteActions.obtenerTodosLosPaquetes,
  obtenerPaquetePorId: paqueteActions.obtenerPaquetePorId,
  obtenerValoracion: paqueteActions.obtenerValoracion,
  enviarValoracion: paqueteActions.enviarValoracion,
  agregarComentario: paqueteActions.agregarComentario,
  eliminarComentario: paqueteActions.eliminarComentario,
  agregarAlCarrito: carritoActions.agregarAlCarrito,
  obtenerProductosPorPaquete: productoActions.obtenerProductosPorPaquete
}

export default connect(mapStateToProps, mapDispatchToProps)(Paquete)