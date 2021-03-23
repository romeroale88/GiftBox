import { connect } from 'react-redux'
import React, { useState } from 'react'
import userActions from '../redux/actions/userActions'
import GoogleLogin from 'react-google-login';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


const Registro = (props) => {
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        cuenta: '',
        password: '',
        imagen: '',
        googleUser: false,
    })
    const [errores, setErrores] = useState([])


    const leerInput = e => {
        var valor = e.target.value
        const campo = e.target.name
        if (campo === "imagen") {
            valor = e.target.files[0];
        }
        setNuevoUsuario({
            ...nuevoUsuario,
            [campo]: valor
        })
    }

    const validarUsuario = async e => {
        setErrores([])
        e.preventDefault()

        const { nombre, apellido, cuenta, password, imagen } = nuevoUsuario
        var formNuevoUsuario = new FormData();
        formNuevoUsuario.append("nombre", nombre)
        formNuevoUsuario.append("apellido", apellido)
        formNuevoUsuario.append("cuenta", cuenta)
        formNuevoUsuario.append("password", password)
        formNuevoUsuario.append("imgFile", imagen)
        formNuevoUsuario.append("googleUser", false)

        if (nombre === '' || apellido === '' || cuenta === '' ||
            password === '' || imagen === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡All fields are required!',
            })

            return false
        }
        setErrores([])
        props.crearCuenta(formNuevoUsuario)
            .then(respuesta => {
                if (respuesta && respuesta.success === false) {
                    setErrores(respuesta.errors)
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'You have registered your user',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        props.history.push('/')
                    })
                }
            })
    }

    //GOOGLE REGISTRO
    const responseGoogle = async (googleResponse) => {
        if (googleResponse.error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Sucedió algo inesperado!',
            })
        }
        else {
            var formNuevoUsuario = new FormData();
            formNuevoUsuario.append("nombre", googleResponse.profileObj.givenName)
            formNuevoUsuario.append("apellido", googleResponse.profileObj.familyName)
            formNuevoUsuario.append("cuenta", googleResponse.profileObj.email)
            formNuevoUsuario.append("password", googleResponse.profileObj.googleId)
            formNuevoUsuario.append("imgFile", googleResponse.profileObj.imageUrl)
            formNuevoUsuario.append("googleUser", true)

            const respuesta = await props.crearCuenta(formNuevoUsuario)
            if (respuesta && respuesta.success === false) {
                setErrores(respuesta.errores)
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'You have registered your user',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    props.history.push('/')
                })
                // .then(function (result) {
                //     if (result.value) {
                //         window.location.href='/'
                //     }})
            }
        }
    }

    return (

        <div className="boxUserRegistro centerCenterRow">

            <div className="container-form modificarEmailUsuario ">
                <div className="formRegistro centerCenterColumn">
                    <h1>Crea una nueva cuenta</h1>
                    <input type="text" name="nombre" placeholder="Nombre"
                        onChange={leerInput} />
                    <input type="text" name="apellido" placeholder="Apellido"
                        onChange={leerInput} />
                    <input type="text" name="cuenta" placeholder="Nombre de cuenta"
                        onChange={leerInput} />
                    <input type="password" name="password" placeholder="password"
                        onChange={leerInput} />
                    <label htmlFor="uploadButton" className="inputFile">
                        <h1>Agrega tu imagen</h1>
                        <input id="uploadButton" className="imgFile" type="file" name="imagen" onChange={leerInput} />
                    </label>

                    <div className="botones">
                        <button className="buttonRegister" onClick={validarUsuario}>Crear Cuenta</button>
                    </div>

                    <GoogleLogin className="google"
                        clientId="1017297947872-u8vq3idnsomfq2n0v298n81g8khtaqm2.apps.googleusercontent.com"
                        buttonText="Create tu cuenta con Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <div className="errores">
                        {errores.map((error, i) => <h1 key={`err${i}`}>{error}</h1>)}
                    </div>

                    <Link to='/iniciarsesion' className="pLinksEntreCuentas"><p>Ya tienes cuenta? Haz click aquí</p></Link>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
const mapDispatchToProps = {
    crearCuenta: userActions.crearCuenta,
    logOut: userActions.logOut

}

export default connect(mapStateToProps, mapDispatchToProps)(Registro)