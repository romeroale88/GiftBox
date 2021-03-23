import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import paqueteActions from '../redux/actions/paqueteActions'
import Comentario from './Comentario'
import Swal from 'sweetalert2'

const Opiniones = ({paquetePorId, opinionesPaquete, eliminarComentario, loggedUser}) => {
  const [opiniones, setOpiniones] = useState([])
  const [visible, setVisible] = useState(false)
  const [comentario, setComentario] = useState({})
  useEffect(() => {
    setOpiniones(opinionesPaquete)
  })

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
        confirmButtonColor: "#c1866a",
        confirmButtonText: "Logueame!",
        background: "#4b98b7",
        iconColor: "white",
        backdrop: "rgba(80, 80, 80, 0.3)",
      })
    } else if (!comentario.comentarioUsuario) {
      Swal.fire({
        title: "Oops!",
        text: "Comment must not be empty!",
        icon: "warning",
        background: "#4b98b7",
        iconColor: "white",
        backdrop: "rgba(80, 80, 80, 0.3)",
      })
    } else {
      e.preventDefault()
      // agregarComentario(comentario)
      setOpiniones(paquetePorId.opiniones.push(comentario))
    }
  }
  return (
    <div className="cajaDeComentarios">
      <h2 className="tituloComentarios">Opiniones:</h2>
      <div style={{ display: 'flex' }}>
        <input type="text" autoComplete="off" name="comentarioUsuario" placeholder="Ingresá tu comentario..." onChange={leerInput} disabled={!loggedUser ? true : false} />
        <button onClick={enviarComentario}>ENVIA</button>
      </div>
      {opinionesPaquete.map(comentario => {
        return <Comentario comentario={comentario} />
      })}
      <p className="verComentarios" onClick={() => setVisible(!visible)} style={{ margin: '2vh', alignSelf: 'flex-end' }}>Cerrar Comentarios </p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    paquetePorId: state.paqueteReducer.paquetePorId,
    loggedUser: state.userReducer.loggedUser
  }
}

const mapDispatchToProps = {
  obtenerPaquetePorId: paqueteActions.obtenerPaquetePorId,
  agregarComentario: paqueteActions.agregarComentario,
  eliminarComentario: paqueteActions.eliminarComentario
}

export default connect(mapStateToProps, mapDispatchToProps)(Opiniones)