import React, {useState} from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import userActions from '../redux/actions/userActions'


const EnviarEmail = ( props ) => {

    const [cuenta, setCuenta] = useState('')
    const [errores, setErrores] = useState ([])
 
    const checkearInputs = cuenta===''

    const validarUsuario = async e => { // function that runs when you click the create user button
        e.preventDefault() //prevent reloading the page
        if(checkearInputs){
            Swal.fire({
                icon: 'error',
                title: '¡CUIDADO!',
                text: "No tienes permitido ingresar a la web",
                showConfirmButton: false,
                timer: 4000
                })
            return true
        }
        setErrores([])

        const respuesta = await props.resetearPassword(cuenta)
        if(respuesta && !respuesta.success){
            setErrores(respuesta.errors)
        }else{
            Swal.fire({
                icon: 'success',
                title: '¡Listo!',
                text: "Revisa tu mail por favor!",
                showConfirmButton: false,
                timer: 4000
                })
        }
    }

console.log(errores)
return (
    <div className="containerRegister">
        <div className="imagRegister"></div>
            <div className="registerInput" >
                <div className= "register">
                    <h2>Solicitud de restablecimiento de contraseña</h2>
                    <div className="userNameAndPassword">
                        <input className="inputRegister" type="text" name="cuenta" placeholder="cuenta" onChange={(e)=>setCuenta(e.target.value.trim())} />
                    </div>
                    <button className="botonRegister" onClick={validarUsuario} >Recuperar contraseña!</button>
                </div>
            </div>
    </div>
        )
    }

const mapDispatchToProps = { // map the actions
   resetearPassword : userActions.resetearPassword //mapDispachToProps object that has an action value
}

export default connect(null,mapDispatchToProps)(EnviarEmail)
