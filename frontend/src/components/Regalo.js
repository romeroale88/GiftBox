
import { useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import regaloActions from "../redux/actions/regaloActions";
import Swal from 'sweetalert2'

const Regalo=({loggedUser,obtenerRegalo})=>{

    const codigo=useRef(null)
    const [regalo,setRegalo]=useState(null)
    const enviarCodigo=async ()=>{
        const respuesta= await obtenerRegalo(codigo.current.value)
        if(respuesta){
            setRegalo(respuesta)
        }
        
        if(respuesta.usado===false){Swal.fire({
            title: 'Disfruta de tu nuevo regalo!',
            width: 600,
            padding: '3em',
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0)
              url("https://media2.giphy.com/media/5YrT02HhIpbiqFbF4j/giphy.gif")
              right top
              no-repeat
            `
          })}
          else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Este codigo ya fue utilizado!',
            })
          }
    }
    console.log(regalo)
    return(
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("https://static.bigbox.com.ar/webSsr/build/trama_usuario.782a82e25f2ec37b2be87b3374f4eb4a.png"` }} >
                <Link to="/">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <h3 style={{fontSize:"2.2rem", color:"#464646",paddingLeft:"1.5vw"}}>Tu regalo</h3>
                
            </div>
            <div className="regaloPadre">            
            {(!regalo || regalo.usado===true)?
            <div  className="regalo" style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                <h1>Canjea el código de tu regalo</h1>
                <input type="text" className="tipoEnvio" placeholder="Ingresa el codigo de tu regalo" ref={codigo}
                    style={{cursor:"text"}}/>
                <button onClick={()=>enviarCodigo()} >Enviar</button>
            </div>
            :regalo.usado===false&&
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                {regalo.paquetesId.map(regalo=>
                <div className="regaloItemPadre">
                    <div className="regaloItem" style={{backgroundImage:`url("${regalo.paqueteId.imagen}")`}}></div>
                    <h3>{regalo.paqueteId.nombre}</h3>
                    <p>{`Cantidad: ${regalo.cantidad}`}</p>
                    <Link className="regaloLink" to={`/paquete/${regalo.paqueteId._id}`}>
                        <div className="regaloBoton">
                            <span>Ver Paquete</span>
                        </div>
                    </Link>
                </div> )}
            </div>
            }
            </div>
        </div>
            
    )
}
const mapStateToProps=(state)=>{
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
const mapDispatchToProps={
    obtenerRegalo:regaloActions.obtenerRegalo
}
export default connect(mapStateToProps,mapDispatchToProps)(Regalo);