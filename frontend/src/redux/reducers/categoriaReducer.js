const initialState = {
  todasLasCategorias: []
}

const categoriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TODAS_CATEGORIAS':
      return {
        ...state,
        todasLasCategorias: action.payload
      }
    default:
      return state;
  }
}

export default categoriaReducer