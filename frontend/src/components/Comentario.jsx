import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import paqueteActions from '../redux/actions/paqueteActions'
import { AiOutlineSend, AiOutlineEdit,  } from "react-icons/ai";
import { BsTrash,BsBackspaceReverse } from "react-icons/bs";

const Comentario = ({ paqueteId, comentario, loggedUser, eliminarComentario, editarComentario }) => {

  const [visible, setVisible] = useState(false)
  const [reComentar, setReComentar] = useState({})
  const [opiniones, setOpiniones] = useState([])

  useEffect(() => {
    setOpiniones(paqueteId.opiniones)
  }, [opiniones])

  const enviarComentarioAEliminar = (e) => {
    e.preventDefault()
    eliminarComentario({
      paqueteId,
      token: loggedUser.token,
      comentarioId: comentario._id
    })
    setOpiniones(paqueteId.opiniones)
  }
  const modificarComentario = e => {
    const nombre = e.target.name
    const nuevoComentario = e.target.value
    setReComentar({
      ...reComentar,
      comentarioId: comentario._id,
      paqueteId,
      token: loggedUser.token,
      [nombre]: nuevoComentario
    })
    setVisible(true)
  }
  const actualizarComentario = async (e) => {
    e.preventDefault()
    if (reComentar.comentarioEditado === undefined) {
      setVisible(!visible)
      return false
    }
    await editarComentario(reComentar)
    setVisible(!visible)
  }
  console.log(comentario)
  console.log(loggedUser)
  return (
    <>
      <div className="comentarioContainer">
        <div className="infoUsuario">
          <div className="imagenDeUsuario" style={{
            backgroundImage: `url(${comentario.imagenUsuario})`
          }}></div>
          <div className="nombreDeUsuario">{comentario.nombreUsuario}</div>
        </div>
        {!visible
          ?
          <div className="cajaDeComentario">
            <div className="comentario">"{comentario.comentarioUsuario}"</div>
              {loggedUser && loggedUser.id === comentario.idUsuario &&
                <div className="borrarYmodificar">
                  <div onClick={modificarComentario} className="editarComentario" style={{cursor: 'pointer'}}><AiOutlineEdit/></div>
                  <div onClick={enviarComentarioAEliminar} className="borrarComentario" style={{cursor: 'pointer'}}><BsTrash/></div>
                </div>}
          </div>
          : <div  className="cajaEditarComentario">
            <input onChange={modificarComentario} defaultValue={comentario.comentarioUsuario} name="comentarioEditado"></input>
            <div className="borrarYmodificar">
              <div onClick={actualizarComentario} className="editarComentario" style={{cursor: 'pointer'}}><AiOutlineSend/></div>
              <div className="borrarComentario" onClick={() => setVisible(!visible)} style={{cursor: 'pointer'}}><BsBackspaceReverse/></div>
            </div>
          </div>
        }
        <div>
        </div>
      </div>
      <div className="linea"></div>
    </>

  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.userReducer.loggedUser,
    paquetePorId: state.paqueteReducer.paquetePorId,
  }
}

const mapDispatchToProps = {
  obtenerPaquetePorId: paqueteActions.obtenerPaquetePorId,
  eliminarComentario: paqueteActions.eliminarComentario,
  editarComentario: paqueteActions.editarComentario
}

export default connect(mapStateToProps, mapDispatchToProps)(Comentario)