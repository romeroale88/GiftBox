import { connect } from 'react-redux'
import React from 'react'
import {useState,useEffect} from 'react'
import { IoCamera } from 'react-icons/io5'
import EditUsuario from '../components/EditUsuario'
import RegalosRecibidos from '../components/RegalosRecibidos'
import ComprasRealizadas from '../components/ComprasRealizadas'
import ComprasGrupales from '../components/ComprasGrupales'
import Credito from '../components/Credito'
import { Link } from 'react-router-dom'
import userActions from '../redux/actions/userActions'

const PaginaUsuario = (props) => {
    console.log(props.loggedUser)
    const[editUsuario, setEdittUsuario] = useState(false)
    const[opcionDiv, setOpciondiv] = useState(null)

    function regalo() {
        setEdittUsuario(true)
        setOpciondiv("regalos")        
    }
    function compRealizadas() {
        setEdittUsuario(true)
        setOpciondiv("realizados")  
    }
    function compGrupales() {
        setEdittUsuario(true)
        setOpciondiv("grupales")  
    }
    function credito() {
        setEdittUsuario(true)
        setOpciondiv("creditos")  
    }

    return (
        <>
        <div>
            <div className='imgTopUsuario'  style={{backgroundImage: `url("https://static.bigbox.com.ar/webSsr/build/trama_usuario.782a82e25f2ec37b2be87b3374f4eb4a.png"`}}>
                <div className='boxUser'>
                    <div className="userIconos">
                        {props.loggedUser.googleUser === 'false' ?
                        <div className="userImagen" style={{backgroundImage: `url("../usuarioImg/${props.loggedUser.imagen}")`}}/>
                        :
                        <div className="userImagen" style={{backgroundImage: `url(${props.loggedUser.imagen})`}}/>
                        }
                        <div >
                            <Link to='/editUsuario'className="iconoCambiarImg"><p ><IoCamera /></p></Link> 
                        </div>
                    </div>
                    <div className="datosUsuaros">
                        <h2>{props.loggedUser && props.loggedUser.nombre}</h2>
                    </div>
                </div>
            </div>
            <div>
                {editUsuario && 
                   <Link>
                     <button onClick={setEdittUsuario(false)}>Editar perfil</button>
                   </Link>
                }
            </div> 
        </div>
        <div className="boxOpcionesUsuario">
            <div className="boxChicaUsuario">
                <div className="menuOpcionesUsuario">
                    <div onClick={regalo}><h3>Regalos recibidos</h3></div>
                    <div onClick={compRealizadas}><h3>Compras Realizadas</h3></div>
                    <div onClick={compGrupales}><h3>Compras grupales</h3></div>
                    <div onClick={credito}><h3>Crédito</h3></div>
                </div>
                <div className="menuOpcionesUsuarioSecciones">
                    {editUsuario ? <EditUsuario/>
                    :<>
                        {opcionDiv === "regalos" ? <RegalosRecibidos/>
                        :<>
                            {opcionDiv === "realizados" ? <ComprasRealizadas/>
                            :<>
                                {opcionDiv === "realizados" ? <ComprasGrupales/>

                                :<Credito/>
                                }
                            </>}          
                        </>}
                    </>
                    }
                </div>
            </div>
        </div>
        <Link to="/" className="logOutButton" onClick={props.logOut}><button>LogOut</button></Link>  
        </>

    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
const mapDispatchToProps = {

    logOut: userActions.logOut
}

// export default connect(mapStateToProps)(PaginaUsuario) 
export default connect (mapStateToProps,mapDispatchToProps )(PaginaUsuario)

