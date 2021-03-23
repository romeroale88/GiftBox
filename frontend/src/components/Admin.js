import React, { useState } from 'react'
import { connect } from 'react-redux'
import CargarProducto from './CargarProducto'
import CargarPaquete from './CargarPaquete'
import { MdKeyboardArrowDown } from 'react-icons/md'

const Admin = () => {

    const [paqueteVisible, setPaqueteVisible] = useState(false)
    const [productoVisible, setProductoVisible] = useState(false)

    function mostrarPaquete () {
        setPaqueteVisible(!paqueteVisible)
    }
    function mostrarProdcuto () {
        setProductoVisible(!productoVisible)
    }

    return(
        <>
        <div className="centerCenterColumn adminContainer">
            <div className='imgTopUsuario' style={{backgroundImage: `url("https://static.bigbox.com.ar/webSsr/build/trama_usuario.782a82e25f2ec37b2be87b3374f4eb4a.png"`}}>
            <h1>Administrador</h1>
            </div>
             
            <div className="menuDeCarga">
                <div className="cargaContent">
                    <div className="cargaContentButton" onClick={mostrarPaquete}>
                        <h3>Cargar Paquete</h3>
                        <MdKeyboardArrowDown/>
                    </div>                    
                    <div className="adminCargaFormContainer">
                        {paqueteVisible===true ? <CargarPaquete/> : <></>}
                    </div>
            </div>
                <div className="cargaContent">
                    <div className="cargaContentButton" onClick={mostrarProdcuto}>
                        <h3>Cargar Producto</h3>
                        <MdKeyboardArrowDown/>
                    </div>                                         
                    <div className="adminCargaFormContainer">
                    {productoVisible===true ? <CargarProducto/> : <></>}
                    </div>
                </div>
            </div>
        </div>
   
        </>
    )
}

const mapStateToProps = state =>{
    return{
        loggedUser : state.userReducer.loggedUser
    }
}
const mapDispatchToProps = {

    
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin)