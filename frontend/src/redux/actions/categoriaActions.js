import axios from 'axios'

const categoriaActions = {
  obtenerTodasLasCategorias: () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get('https://giftbox-app.herokuapp.com/api/categorias')
        dispatch({type: 'TODAS_CATEGORIAS', payload: response.data.response})
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default categoriaActions