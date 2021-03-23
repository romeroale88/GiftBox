import axios from "axios"

const regaloActions={
    modificarRegalo:(regalo)=>{
        return (dispatch,getState)=>{
            dispatch({type:"MODIFICAR_REGALO",payload:regalo})
        }
    },
    enviarRegalo:()=>{
        console.log("entro e enviar regalo")
        return async(dispatch,getState)=>{
            try {
                console.log(getState().regaloReducer.regalo)
                const response= await axios.post(`https://giftbox-app.herokuapp.com/api/regalo`, getState().regaloReducer.regalo,
                  {
                    headers: {
                      Authorization: `Bearer ${getState().userReducer.loggedUser.token}`
                    }
                  })
                return response.data
              } catch (error) {
                console.log('ERROR AL ENVIAR REGALO')
              }
        }
    },
    obtenerRegalo:(_id)=>{
        return async(dispatch, getState) => {
        const response= await axios.get(`https://giftbox-app.herokuapp.com/api/regalo/${_id}`)
        console.log(response)
        return response.data.response
    }
    }
}
export default regaloActions