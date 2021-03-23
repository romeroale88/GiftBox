
import { BsDash, BsFillPeopleFill, BsPlus, BsTrash} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { connect } from "react-redux";
import carritoActions from "../redux/actions/carritoActions";
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const Carrito=({carrito,eliminarDelCarrito,actualizarCarrito,total,loggedUser})=>{
    if(!carrito){return <h1>loading..</h1> }


    function eliminarPaquete(paquete) {

        eliminarDelCarrito(paquete)
        const MySwal = withReactContent(Swal)
                MySwal.fire({
                title: <p className="popup" style={{color:"black",paddingTop: 15}}>Paquete eliminado!</p>,
                icon:'error',
                toast: true,
                timer:1300,
                timerProgressBar:true,
                showConfirmButton:false,
                width:200, 
                background:'#f6d3d3',
                iconColor:'#f00606'                                        
                })
        if(!carrito){return <h1>loading..</h1> }
    }
    const usuarioNologueado=()=>{
        const MySwal = withReactContent(Swal)
                MySwal.fire({
                title: <p className="popup" style={{color:"black", fontSize:15,paddingTop: 15}}>Tenes que iniciar sesion para continuar con la compra!</p>,
                icon:'error',
                toast: true,
                timer:2500,
                timerProgressBar:true,
                showConfirmButton:false,
                width:200, 
                background:'#f6d3d3',
                iconColor:'#f00606'                                        
                })  
    }
    function carritoVacio() {

        const MySwal = withReactContent(Swal)
                MySwal.fire({
                title: <p className="popup" style={{color:"black", fontSize:15,paddingTop: 15}}>No hay paquetes en tu carrito!</p>,
                icon:'error',
                toast: true,
                timer:1500,
                timerProgressBar:true,
                showConfirmButton:false,
                width:200, 
                background:'#f6d3d3',
                iconColor:'#f00606'                                        
                })
        if(!carrito){return <h1>loading..</h1> }
    }

    return(
        <>
        <div className="carrito">
            <div className="carritoHead"  style={{ backgroundImage: `url("../assets/carritoImagen.png")` }} >
                <Link to="/">
                    <BiArrowBack style={{fontSize: "3rem", color:"#464646"}}/>
                </Link>
                <h3 style={{fontSize:"2.2rem", color:"#464646",paddingLeft:"1.5vw"}}>Tu carrito</h3>
                
            </div>
            <div className="carritoSection">
            {carrito.length!==0
            ?
                <div className="carritoPaquetes">
                    {carrito && carrito.map(paquete=>
                        <div className="carritoPaquete" key={`carritoPaquete${paquete._id}`}>
                            <div className="carritoPaqueteNombre" style={{ backgroundImage: `url("../assets/bannerCarrito.jpg")` }} >
                                {paquete.nombre}
                                <BsTrash onClick={()=>eliminarPaquete(paquete)} style={{cursor:"pointer"}}/>
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
                                    <div id="carritoCantidad1" >
                                        {paquete.cantidad===1 
                                        ? <button style={{cursor:"not-allowed",backgroundColor:"rgb(169 161 161 / 58%)"}} className="buttonCarrito"><BsDash/></button>
                                        : <button value={-1} onClick={(e)=>actualizarCarrito(paquete,e.target.value)} className="buttonCarrito"><BsDash/></button>}
                                        <div ><h5 >x{paquete.cantidad}</h5></div>
                                        {paquete.stock===0
                                        ?<button style={{cursor:"not-allowed",backgroundColor:"#eaeaea"}}  className="buttonCarrito"><BsPlus/></button>
                                        :<button value={1} onClick={(e)=>actualizarCarrito(paquete,e.target.value)} className="buttonCarrito"><BsPlus/></button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            :
            <div className="carritoPaquetes" style={{paddingTop:"10vh",fontSize:"1.4rem", backgroundImage: 'url("https://www.comidasdevictor.com/assets/img/carrito_vacio.png")', backgroundSize: '40%', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom'}}>
                <h2>Tu carrito está vacío</h2>
                <h5>¿No sabés qué comprar? ¡Miles de paquetes te esperan!</h5>
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
                            {(carrito && carrito.length === 0)
                            ?<div  id="carritoContinuar" style={{cursor:"pointer"}}onClick={carritoVacio}>Continuar</div>
                            : (!loggedUser) ?<div  id="carritoContinuar" style={{cursor:"pointer"}}onClick={usuarioNologueado}>Continuar</div>
                            :<Link to="/envio" id="carritoContinuar">Continuar</Link>}
                            <Link to="/paquetes" id="carritoSeguirComprando">Seguir Comprando</Link>
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
        loggedUser:state.userReducer.loggedUser,
        carrito: state.carritoReducer.carrito,
        total:state.carritoReducer.total
    }
}
const mapDispatchToProps = {
    agregarAlCarrito: carritoActions.agregarAlCarrito,
    eliminarDelCarrito: carritoActions.eliminarDelCarrito,
    actualizarCarrito: carritoActions.actualizarCarrito
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito)