const initialState = {
    regalo: null
}

const regaloReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MODIFICAR_REGALO':
            return {
                ...state,
                regalo: action.payload
            }   
        default:
        return state
    }
}

export default regaloReducer