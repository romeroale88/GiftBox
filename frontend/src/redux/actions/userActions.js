import axios from "axios"
import Swal from'sweetalert2';


const userActions={
    crearCuenta: (formNuevoUsuario) => {
        return async (dispatch,getstate) => {
            try{
              const data = await axios.post("https://giftbox-app.herokuapp.com/api/usuarios",formNuevoUsuario,{
                headers: {"Content-Type": "multipart: form-data"}
              }); 
              if (data.data.success){             
                dispatch({type:'INICIAR_SESION', payload:data.data})
                return data.data.response
              } else{
                return data.data
              }
              }catch(error){
                const data =[{errors:'Paso algo...'}]
                return data.data
              }
          }       
    },
    cerrarSesion: () => {
        return (dispatch, getState) => {
            dispatch({type: 'CERRAR_SESION'})
        }
    },
    logFromLS: (token) => {
        return async (dispatch, getState) => {
            try {
                const respuesta = await axios.post('https://giftbox-app.herokuapp.com/usuarios/ls', {token}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                dispatch({type: 'INICIAR_SESION', payload: {response: {...respuesta.data.response}}})
            } catch(err) {
                localStorage.clear()
            }
        }
    },
     resetearPassword: (cuenta)=> {
        return async (dispatch) => {
            try{
                const response = await axios.post('https://giftbox-app.herokuapp.com/api/user/resetear-password', {cuenta})
                dispatch({type: 'RESETEAR_PASSWORD'})
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: "Algo salio mal, intenta nuevamente!",
                    showConfirmButton: false,
                    timer: 4000
                    })
            }
        }
    },   
    logOut:()=>{
        return (dispatch, getState)=>{
            try{
                dispatch({type:"LOG_OUT"})
            }
            catch(err){
                console.log(err)
            }
        }
      },
    iniciarSesion: (usuario) => {
        return async (dispatch, getState) => {
            const respuesta = await axios.post('https://giftbox-app.herokuapp.com/api/login', usuario)
            if (!respuesta.data.success) {
                return respuesta.data
            }
            dispatch({type:'INICIAR_SESION', payload: respuesta.data})
        }
    },
    editUsuarioPass : (editarUsuario, id) => {
        return async (dispatch, getState)=> {
            const respuesta = await axios.put(`https://giftbox-app.herokuapp.com/api/usuarios/${id}`, editarUsuario )
            if(!respuesta.data.success){
                return respuesta.data 
            }
            else{
                dispatch({type:'EDITAR_PASS', payload:respuesta.data})

                return respuesta.data
            }
        }
    },
    cambiarPassword : (editUsuario) => {
        return async (dispatch, getState)=> {
            const respuesta = await axios.put("https://giftbox-app.herokuapp.com/api/cambiar-password", editUsuario)
            if(!respuesta.data.success){
            return respuesta.data 
        }
        }
    },
    editarUsuarioImg : (formNuevaImg, id) => {
        
        return async (dispatch, getState)=> {
            const respuesta = await axios.put(`https://giftbox-app.herokuapp.com/api/imagen/${id}`, formNuevaImg)
            
            if(respuesta.data.success){
                dispatch({type:'EDITAR_FOTO', payload: respuesta.data})
                return respuesta.data             
        }
        }
    }
}
export default userActions;