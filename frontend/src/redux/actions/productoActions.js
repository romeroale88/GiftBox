import axios from 'axios'
import Swal from 'sweetalert2'

const productoActions = {
  obtenerTodoslosProductos: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get('https://giftbox-app.herokuapp.com/api/productos')
        dispatch({type: 'TODOS_PRODUCTOS', payload: response.data.response})
      } catch (error) {
        console.log(error)
      }
    }
  },
  obtenerProductosPorPaquete: (_id)=>{
    console.log("1111111111111111111111111111111111111111111111111111")
    return async (dispatch, getState) => {
      const response= await axios.get(`https://giftbox-app.herokuapp.com/api/productos/paquete/${_id}`)
      console.log(response.data)
      if (response.data.success===true){
        dispatch({type:"PRODUCTOS_DEL_PAQUETE", payload: response.data.response})
      }
    }
  },
  cargarProducto: (nuevoProducto) => {  
    console.log(nuevoProducto)  
    return async (dispatch, getState) => {      
      try{
        const response = await axios.post('https://giftbox-app.herokuapp.com/api/productos',nuevoProducto, {
          headers: {"Content-Type": "multipart: form-data"}
        })
        dispatch({type:"CARGAR_PRODUCTO", payload: response.data.response})
      }
      catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Problema con la carga de Paquete!',
        })
      }
      
    }
  } 
    
}
export default productoActions;