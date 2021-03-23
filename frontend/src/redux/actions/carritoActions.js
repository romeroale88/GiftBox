import axios from 'axios'

const carritoActions = {
  agregarAlCarrito: ({nombre,_id,cantidad,precio,descripcion,imagen,cantidadPersonas ,stock }) => {
    
    return async (dispatch, getState) => {
        dispatch({type:"AGREGAR_AL_CARRITO", payload: {nombre,_id,cantidad,precio,descripcion,imagen,cantidadPersonas,stock}})
        localStorage.setItem("carrito",JSON.stringify(getState().carritoReducer.carrito));
        localStorage.setItem("total",JSON.stringify(getState().carritoReducer.total));
    }
  }, 
  eliminarDelCarrito: ({_id,precio,cantidad})=>{
    return async (dispatch, getState) => {
      dispatch({type:"ELIMINAR_DEL_CARRITO", payload: {_id,precio,cantidad}})
      localStorage.setItem("carrito",JSON.stringify(getState().carritoReducer.carrito));
      localStorage.setItem("total",JSON.stringify(getState().carritoReducer.total));
    }
  },
  actualizarCarrito: ({_id},numero)=>{
    return async (dispatch, getState) => {
      dispatch({type:"ACTUALIZAR_CARRITO", payload: {_id,numero}})
      localStorage.setItem("carrito",JSON.stringify(getState().carritoReducer.carrito));
      localStorage.setItem("total",JSON.stringify(getState().carritoReducer.total));
    }
  },
  carritoDelLS: (carritoLS,total)=>{
    return async (dispatch,getState)=>{
      dispatch({type:"CARRITO_LS", payload:{carritoLS,total}})
    }
  }

}
export default carritoActions;