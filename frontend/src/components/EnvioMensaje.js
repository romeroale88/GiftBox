
import { BsCheck, BsFillPeopleFill} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import ProgressBar from "@ramonak/react-progress-bar";
import regaloActions from "../redux/actions/regaloActions";
import { useState } from "react";

const Envio=({carrito,total,regalo,modificarRegalo})=>{
    console.log(regalo)
    const [deQuien,setDeQuien]=useState("")
    const [paraQuien,setParaQuien]=useState("")
    const [mensaje,setMensaje]=useState("")
    if(!carrito){return <h1>loading..</h1> }

    return(
        <>
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("../assets/carritoImagen.png")` }} >
                <Link to="/envio">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <div id="progresoCompra">
                    <ProgressBar completed={40} labelAlignment="outside" bgcolor="#2e93e5"/>
                    <div style={{display:"flex",justifyContent:"space-between",paddingTop:"1vh",paddingRight:"2vw"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}><p>Envio </p><BsCheck size="1.3rem" color="green"/></div>
                        <p>Mensaje</p>
                        <p>Pago</p>
                        <p>Resumen</p>
                    </div>
                </div>
            </div>
            <div className="carritoSection">
            {carrito.length!==0
            &&
                <div className="carritoPaquetes">
                    {carrito && carrito.map(paquete=>
                        <div className="carritoPaquete" key={`carritoP${paquete._id}`}>
                            <div className="carritoPaqueteNombre" style={{ backgroundImage: `url("../assets/bannerCarrito.jpg")` }} >
                                {paquete.nombre}
                            </div>
                            <div className="carritoPaqueteContenido">
                                <div id="carritoImagen">
                                    <div className="carritoImagen" style={{backgroundImage: `url(${paquete.imagen})`}}></div>
                                </div>
                                <div id="carritoDescripcion">
                                    <div>
                                        <h4 style={{textShadow:"2px"}}> <BsFillPeopleFill/> Para {paquete.cantidadPersonas} personas o mas</h4>
                                        <p>Stock: {paquete.stock}</p>
                                    </div>
                                    <div>
                                        <h3>${paquete.precio}</h3>
                                    </div>
                                </div>
                                <div id="carritoCantidad">
                                    
                                </div>
                            </div>
                        </div>
                    )}
                <div className="inputMensajes">
                    <h3>¡Dejale tu mensaje! (opcional)</h3>
                    <input type="text" placeholder="De" onChange={(e)=>setDeQuien(e.target.value)}/> 
                    <input type="text" placeholder="Para" onChange={(e)=>setParaQuien(e.target.value)}/> 
                    <textarea type="textarea" placeholder="Mensaje" onChange={(e)=>setMensaje(e.target.value)}/>                
                </div>
                <div  style={{width:"100%", paddingTop:"2vh"}}>
                    <Link to="/pago" id="carritoContinuar" style={{margin:"0"}} 
                    onClick={()=>modificarRegalo({...regalo,email:{...regalo.email,deMensaje:deQuien,paraMensaje:paraQuien,mensaje}})}>
                         Continuar al pago
                    </Link>
                </div>
            </div>
            }
                <div className="carritoResumen">
                    <div>
                        <div id="resumenTitulo">
                            <h4>Resumen de compra</h4>
                        </div>
                        {carrito.map(paquete=>
                            <div id="resumenPaquetes" key={`resumenPaq${paquete._id}`}>
                                <div>
                                    <p>{paquete.nombre} x{paquete.cantidad}</p>
                                </div>
                                <p> $ {paquete.precio*paquete.cantidad} </p>
                            </div>
                        )}
                        <div id="resumenTotal" >
                            <p>Total</p>  
                            <p>$ {total}</p>
                        </div>
                        <div id="resumenContinuarYseguir">
                            <Link id="carritoSeguirComprando">Seguir Comprando</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        carrito: state.carritoReducer.carrito,
        total:state.carritoReducer.total,
        regalo:state.regaloReducer.regalo
    }
}
const mapDispatchToProps ={
    modificarRegalo: regaloActions.modificarRegalo
}
export default connect(mapStateToProps, mapDispatchToProps)(Envio)