import React from 'react'
import {connect} from 'react-redux'
import { IoCamera } from 'react-icons/io5'
import {useState} from 'react'
import userActions from '../redux/actions/userActions'

function RecuperarPassword(props) {
    console.log(props)
    const[editarUsuario, setEditUsuario ] = useState({})


    const leerInputPass = e => {
        const valor = e.target.value
        const campo = e.target.name
        setEditUsuario({
            ...editarUsuario,    
            [campo]:valor
        })
    }    


    const cambiarPassword = () =>{
    
        props.cambiarPassword(editarUsuario)
    }

  
    
    return (
        <div>
           
            <div className="editUsuario">
                <form className="modificarEmailUsuario">
                    <p>Ingrese su Email</p>
                    <input type="text" placeholder="Email" name="cuenta" onChange={leerInputPass}/>                
                    <div className="cambiarPassword">
                    <p>Cambiar Contraseña</p>
                    <input type="password" placeholder="Nueva Contraseña" name="password" onChange={leerInputPass} />
                </div>
                </form>
                <div className="guardaCambioContraseña" onClick={cambiarPassword} >
                    <p>GUARDAR</p>
                </div>
            </div>                         
        </div>
    )
    
}


 const mapDispatchToProps = {
     cambiarPassword: userActions.cambiarPassword
     
}


export default connect(null, mapDispatchToProps)(RecuperarPassword)