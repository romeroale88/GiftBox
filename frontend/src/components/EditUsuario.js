import React from 'react'
import {connect} from 'react-redux'
import { IoCamera } from 'react-icons/io5'
import {useState, useEffect} from 'react'
import userActions from '../redux/actions/userActions'
import Swal from 'sweetalert2'

function EditUsuario(props) {
    console.log(props.loggedUser)
    const[editarUsuario, setEditUsuario ] = useState({
        passwordAnterior:'',
        repetirPassword:'',
        password:'',
        passwordVerificado:''
    })
    const [editImagen, setEditImagen] = useState({})
    const [errores, setErrores] = useState([])
    const [visible, setVisible] = useState(false)

    const leerInputPass = e => {
        
        const valor = e.target.value
        const campo = e.target.name
         var verificado = false
        if(campo === 'password'){


            if (editarUsuario.passwordAnterior === editarUsuario.repetirPassword){
                verificado = true

            }
            else{
                setErrores(["¡Las contraseñas no coinciden!"])
                // Swal.fire({
                //     icon: 'error',
                //     title: '¡Lo siento!',
                //     text: '¡Las contraseñas no coinciden!',
                // })
                return false
            }
        }
        setEditUsuario({
            ...editarUsuario,    
            [campo]:valor,
            passwordVerificado: verificado ? editarUsuario.passwordAnterior : ''
        }) 
    }    

    const leerImPass = e => {
        const valor =e.target.files[0]
        const campo = e.target.name
        setEditImagen({
            ...editImagen,    
            [campo]:valor
        })        
    }

    
    const cambiarPassword = async e =>{
        setErrores([])
        e.preventDefault()

        if (editarUsuario.passwordAnterior === '' || editarUsuario.repetirPassword === '' ||
        editarUsuario.password === '') {
           setErrores(["¡Todos los campos son requeridos!"])
            // Swal.fire({
            //     icon: 'error',
            //     title: '¡Lo siento!',
            //     text: '¡Todos los campos son requeridos!',
            //   })
            return false
        }

        const respuesta = await props.editUsuarioPass(editarUsuario, props.loggedUser.id)

        if (respuesta && !respuesta.success) {
            console.log(respuesta.errors)
            setErrores(["¡Su contraseña anterior no coincide! !Intente nuevamente!"])
            // Swal.fire({
            //     icon: 'error',
            //     title: '¡Lo siento!',
            //     text: '¡Su contraseña anterior no coincide! !Intente nuevamente!',
            //   })
            return false
        } else {
            props.history.push('/')
            Swal.fire({
                icon: 'success',
                title: 'Se han guardado los cambios de manera exitosa',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
  

    const cambiarImagen = () =>{        
        const {imagen} = editImagen
        var formNuevaImg = new FormData();
        formNuevaImg.append("imgFile",imagen)
        const respuesta = props.editarUsuarioImg(formNuevaImg, props.loggedUser.id)
        if(respuesta && !respuesta.succes){
            console.log(respuesta.errors)
            return false
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Se han guardado los cambios de manera exitosa',
                showConfirmButton: false,
                timer: 1500
              })
            props.history.push('/')
        }
    }

    console.log(errores)
    return (

        <div>
            <div className='imgTopUsuario' style={{backgroundImage: `url("https://static.bigbox.com.ar/webSsr/build/trama_usuario.782a82e25f2ec37b2be87b3374f4eb4a.png"`}}>
                <div className='boxUser'>
                    <div className="userIconos">
                    {props.loggedUser.googleUser === 'false' ?
                        <div className="userImagen" style={{backgroundImage: `url("../usuarioImg/${props.loggedUser.imagen}")`}}/>
                        :
                        <div className="userImagen" style={{backgroundImage: `url(${props.loggedUser.imagen})`}}/>
                        }
                        <div className="iconoCambiarImg">
                            <p><IoCamera /></p> 
                        </div>
                    </div>
                    <div className="datosUsuaros">
                        <h2>{props.loggedUser && props.loggedUser.nombre}</h2>
                    </div>
                </div>
            </div>
            <div className="editUsuario">
                <form className="modificarEmailUsuario">
                    <input type="texto" placeholder="Contraseña anterior" name="passwordAnterior" onChange={leerInputPass} />
                    <input type="texto" placeholder="Repetir contraseña anterior" name="repetirPassword" onChange={leerInputPass} />    
                <div className="cambiarPassword">
                    <p>Cambiar Contraseña</p>
                    <input type="texto" placeholder="Nueva Contraseña" name="password" onChange={leerInputPass} />
                </div>
                </form>
                <div className="guardaCambioContraseña" onClick={cambiarPassword} >
                    <p>GUARDAR</p>
                </div>
            </div>

            <div className="errores">
                {errores && errores.map(error => <h2>{error}</h2>)}
            </div>  
        {props.loggedUser.googleUser === "false" &&
            <div className="editUsuario">
                <div className="modificarEmailUsuario">
                    <label htmlFor="uploadButton" className="inputFile">
                        <p>Cambie Foto</p>
                        <input id="uploadButton" className="imgFile" type="file"  name="imagen" onChange={leerImPass}/>
                    </label>
                </div>
                <div className="guardaCambioContraseña" onClick={cambiarImagen} >
                    <p>CAMBIAR IMG</p>
                </div>
            </div> 
        } 
        </div>
    )
    
}

const mapStateToProps = state => {
    return{
     loggedUser: state.userReducer.loggedUser
    }
 }
 const mapDispatchToProps = {
     editUsuarioPass: userActions.editUsuarioPass,
     editarUsuarioImg: userActions.editarUsuarioImg
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUsuario)