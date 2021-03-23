import axios from 'axios'
import Swal from 'sweetalert2'

const paqueteActions = {
  obtenerTodosLosPaquetes: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get('https://giftbox-app.herokuapp.com/api/paquetes')
        dispatch({ type: 'TODOS_PAQUETES', payload: response.data.response })

      } catch (error) {
        console.log(error)
      }
    }
  },
  obtenerPaquetesPorCategoria: (categoria) => {
    return (dispatch, getState) => {
      try {
        dispatch({ type: 'PAQUETES_CATEGORIA', payload: categoria })
      } catch (error) {
        console.log(error)
      }
    }
  },
  obtenerPaquetePorId: (_id) => {
    
    return (dispatch, getState) => {
      try {
        dispatch({ type: 'PAQUETE_ID', payload: _id })
        // return(getState().paqueteReducer.todosLosPaquetes.find(paquete => paquete._id  === _id))
      } catch (error) {
        console.log(error)
      }
      return (getState().paqueteReducer.paquetePorId)
    }
  },
  filtrarPaquetesMasReg: () => {
    return (dispatch, getState) => {
      try {
        dispatch({ type: 'PAQUETES_MAS_REG', payload: getState })
      } catch (error) {
        console.log(error)
      }
    }
  },
  filtrarPaquetes: (valor) => {
    return (dispatch, getState) => {
      try {
        dispatch({ type: 'FILTRO', payload: valor })
      } catch (error) {
        console.log(error)
      }
    }
  },
  obtenerValoracion: (paquete) => {
    return (dispatch, getState) => {
      dispatch({ type: 'PROMEDIO', payload: paquete })
    }
  },
  enviarValoracion: (_id, usuarioYvaloracion) => {
    return async (dispatch, getState) => {
      const response = await axios.put(`https://giftbox-app.herokuapp.com/api/paquetes/${_id}`, usuarioYvaloracion)
      if (response.data.response) {
        dispatch({ type: "ENVIAR_VALORACION", payload: response.data.response })
      }
    }
  },
  agregarComentario: nuevoComentario => {
    const { comentarioUsuario, token, paqueteId } = nuevoComentario
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`https://giftbox-app.herokuapp.com/api/paquete/comentario`, { comentarioUsuario, paqueteId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        dispatch({ type: 'ENVIAR_COMENTARIO', payload: response.data.response })
      } catch (error) {
        Swal.fire('ENTRE EN EL ERROR DE AGREGAR COMENTARIO')
      }

    }
  },
  eliminarComentario: comentarioAEliminar => {

    const { comentarioId, paqueteId, token } = comentarioAEliminar
    return async (dispatch, getState) => {
      try {
        const response = await axios.delete(`https://giftbox-app.herokuapp.com/api/paquete/comentario/${paqueteId}/${comentarioId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        dispatch({ type: 'ELIMINAR_COMENTARIO', payload: response.data.response })
      } catch (error) {
        Swal.fire('ENTRE EN EL ERROR DE ELIMINAR COMENTARIO')
      }

    }
  },
  editarComentario: comentarioAEditar => {
    const { comentarioId, paqueteId, comentarioEditado, token } = comentarioAEditar
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(`https://giftbox-app.herokuapp.com/api/paquete/comentario`, { comentarioId, paqueteId, comentarioEditado },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        dispatch({ type: 'EDITAR_COMENTARIO', payload: response.data.response })
      } catch (error) {
        Swal.fire('ENTRE EN EL ERROR DE EDITAR COMENTARIO')
      }
    }
  },
  nuevoPaquete: nuevoPaquete =>{
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('https://giftbox-app.herokuapp.com/api/paquetes', nuevoPaquete,{
          headers: {"Content-Type": "multipart: form-data"}
        }
      )
      dispatch({type: 'NUEVO_PAQUETE', payload: response.data.response})
    } catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Problema con la carga de Paquete!',
      })
    }
}}}



export default paqueteActions;