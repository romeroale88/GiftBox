const initialState = {
    loggedUser: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INICIAR_SESION':
            localStorage.setItem('nombre', action.payload.response.nombre)
            localStorage.setItem('token', action.payload.response.token)
            localStorage.setItem('imagen', action.payload.response.imagen)
            localStorage.setItem('id', action.payload.response.id)
            localStorage.setItem('googleUser', action.payload.response.googleUser)
            localStorage.setItem('rol', action.payload.response.rol)
            return {
                ...state,
                loggedUser: action.payload.response
            }   
        case 'LOG_OUT':
            localStorage.clear();
            return {
                ...state,
                loggedUser:null
            } 
         case 'EDITAR_PASS' :
            return{
                ...state,
                loggedUser: action.payload
            }          
        default:
        return state
    }
}

export default userReducer