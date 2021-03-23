const initialState = {
    todosLosProductos:null,
    productosDelpaquete:[]
  }
  const productoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TODOS_PRODUCTOS':
        return {
          ...state,
          todosLosProductos: action.payload
        }
      case 'PRODUCTOS_DEL_PAQUETE':
        console.log("222222222222222222222222222222222222222")
      return {
          ...state,
          productosDelpaquete: action.payload
        }
      default:
        return state;
    }
  }
  export default productoReducer;