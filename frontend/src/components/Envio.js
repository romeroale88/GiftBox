
import { BsFillPeopleFill} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import ProgressBar from "@ramonak/react-progress-bar";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import regaloActions from "../redux/actions/regaloActions";
import { useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Envio=({carrito,total,modificarRegalo})=>{
    const [tipoEnvio,setTipoEnvio]=useState("")
    const [paraQuien,setParaQuien]=useState("")
    const [mailDestinatario, setMailDestinatario]= useState("");
    const [errores,setErrores]=useState([]);
    const [asunto,setAsunto]=useState("")
    const [mailValido,setMailValido]=useState(false)
    console.log(mailDestinatario)
    
    useEffect(() => {
        var paquetesId=[]
            carrito.map(paquete=>paquetesId.push({paqueteId:paquete._id,cantidad:paquete.cantidad}))
            modificarRegalo({email:{
                emailDestinatario:mailDestinatario,
                asunto,
            },carrito,
            paquetesId})
    }, [])
    
    const continuar=()=>{
        let lastAtPos = mailDestinatario.lastIndexOf('@');
        let lastDotPos = mailDestinatario.lastIndexOf('.');
        if (paraQuien!=="paraMi" && (mailDestinatario==="" || !(lastAtPos < lastDotPos && lastAtPos > 0 && mailDestinatario.indexOf('@@') == -1 && lastDotPos > 2 && (mailDestinatario.length - lastDotPos) > 2))) {
            emailErroneo()
            return false;
        }
        else{ 
            var paquetesId=[]
            carrito.map(paquete=>paquetesId.push({paqueteId:paquete._id,cantidad:paquete.cantidad}))
            modificarRegalo({email:{
                emailDestinatario:mailDestinatario,
                asunto,
            },carrito,
            paquetesId})
            setErrores([])
            setMailValido(true)
            return true;
        }
    }
    function emailErroneo() {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <p className="popup" style={{color:"black", fontSize:15}}>E-mail no válido! Intente nuevamente</p>,
            icon:'error',
            toast: true,
            timer:1500,
            timerProgressBar:true,
            showConfirmButton:false,
            width:500, 
            background:'#f6d3d3',
            iconColor:'#f00606'                                        
        })
    }
    function formaDeEnvio() {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: <p className="popup" style={{color:"black", fontSize:15}}>Seleccione una forma de envío!</p>,
            icon:'error',
            toast: true,
            timer:1500,
            timerProgressBar:true,
            showConfirmButton:false,
            width:500, 
            background:'#f6d3d3',
            iconColor:'#f00606'                                        
        })
    }
    
    console.log(mailValido)
    if(!carrito){return <h1>loading..</h1> }
    return(
        <>
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("../assets/carritoImagen.png")` }} >
                <Link to="/carrito">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <div id="progresoCompra">
                    <ProgressBar completed={5} labelAlignment="outside" bgcolor="#2e93e5"/>
                    <div style={{display:"flex",justifyContent:"space-between",paddingTop:"1vh",paddingRight:"2vw"}}>
                        <p>Envio</p>
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
                        <div className="carritoPaquete" key={`carPac${paquete._id}`}>
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
                <div style={{width:"100%",textAlign:"center", backgroundColor:"#fff"}}>   
                    <h4 style={{padding:"3vh",fontSize:"1.2rem"}}>Elegí un método de envío</h4>
                    <div id="metodoDeEnvio">
                        <div className="metodoDeEnvio1">
                            <div className="tipoEnvio" onClick={()=>setTipoEnvio("mail")}>
                                <AiOutlineMail/> 
                                <p style={{paddingLeft:"1vw"}}>Envio por Email</p>
                            </div> 
                        </div>
                        <div className="metodoDeEnvio1">
                            <div className="tipoEnvio" onClick={()=>setTipoEnvio("whatsapp")}>
                                <SiWhatsapp/>
                                <p style={{paddingLeft:"1vw"}}>Envio por Whatsapp</p>
                            </div>
                        </div>
                        <div className="metodoDeEnvio1">
                            <div className="tipoEnvio">Envio físico por correo</div>
                        </div>
                        <div className="metodoDeEnvio1">
                            <div className="tipoEnvio">Retiro por tienda física de GiftBox</div>
                        </div>
                    </div>
                </div>
                
                {tipoEnvio==="mail" &&
                <>
                    <div>
                        <h4 style={{padding:"3vh",fontSize:"1.2rem"}}>¿A quién se lo enviás?</h4>
                    </div>
                    <div id="inputsEnvio">
                        <label htmlFor="regaloInput" style={{ display:"flex",alignItems:"center"}}>
                            <input type='radio' id="regaloInput" value='regalo' name='paraQuien' onChange={()=>setParaQuien("regalo")}/>
                            <span style={{paddingLeft:"1vw"}}>Es para regalar</span>
                        </label>
                        <label  htmlFor="paraMi" style={{ display:"flex",alignItems:"center" }} onChange={()=>setParaQuien("paraMi")}>
                            <input type='radio' id="paraMi" value='paraMi' name='paraQuien'/>
                            <span style={{paddingLeft:"1vw"}}>Es para mí</span>
                        </label>  
                    </div>
                {paraQuien==="regalo" &&
                    <div style={{display:"flex",flexDirection:"column",width:"100%" , height:"25vh", border:"black"}}>
                        <input type="email" className="tipoEnvio" placeholder=" E-mail del destinatario*" 
                        style={{height:"8vh",marginTop:"2vh",cursor:"text"}} onChange={(e)=>setMailDestinatario(e.target.value)}/>
                        <input type="text" className="tipoEnvio" placeholder=" Asunto del E-mail (opcional)" onChange={(e)=>setAsunto(e.target.value)}
                        style={{height:"8vh",marginTop:"2vh",cursor:"text"}}/>
                        {errores.length>0 && errores.map((error, i)=><p style={{paddingTop:"1vh"}} key={`error${i}`}>-{error}</p> )}
                    </div>  
                }              
                </>
                }  
                <div  style={{width:"100%", paddingTop:"2vh"}}>
                    {paraQuien==="paraMi"
                    ? <Link id="carritoContinuar" style={{margin:"0"}} to="/pago"> Continuar al pago</Link> 
                    : (paraQuien==="regalo" && mailDestinatario==="") 
                    ? <Link id="carritoContinuar"style={{margin:"0"}}  onClick={emailErroneo} > Continuar al mensaje</Link>
                    : (paraQuien==="regalo" &&mailValido===false)
                    ?  <Link id="carritoContinuar"style={{margin:"0"}} to="/envioMensaje" onClick={continuar} >Continuar al mensaje</Link> 
                    : <Link id="carritoContinuar" style={{margin:"0"}} onClick={formaDeEnvio}>Continuar al pago</Link> }



                    {/* {paraQuien !== '' ?
                    <Link id="carritoContinuar" style={{margin:"0"}} onClick={continuar}>
                        {paraQuien==="paraMi" ?<Link to="/pago"> Continuar al pago</Link> : <Link to="/envioMensaje" > Continuar al mensaje</Link>}
                    </Link>
                    :
                    <Link id="carritoContinuar" style={{margin:"0"}} onClick={formaDeEnvio}>
                        Continuar al pago
                    </Link> 
                    } */}
                </div>

            </div>
            
            }
                <div className="carritoResumen">
                    <div>
                        <div id="resumenTitulo">
                            <h4>Resumen de compra</h4>
                        </div>
                        {carrito.map(paquete=>
                            <div id="resumenPaquetes" key={`resPac${paquete._id}`}>
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