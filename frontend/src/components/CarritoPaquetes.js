import { connect } from 'react-redux'
import paqueteActions from '../redux/actions/paqueteActions'
import React , {useEffect} from 'react'
import carritoActions from '../redux/actions/carritoActions'
import Carrito from './Carrito'

const CarritoPaquetes = ({ todosLosPaquetes,agregarAlCarrito, obtenerTodosLosPaquetes}) => {
    
    useEffect(() => {
        obtenerTodosLosPaquetes()
    }, [])

    return (
        <>
                <Carrito/>
            <h2>Productos del Paquete</h2>
            <div style={{border:"solid ", display:"flex", flexWrap:"wrap"}}>
                {todosLosPaquetes&& todosLosPaquetes.map(paquete=>
                <div style={{border:" solid red", width:"24vw",height:"20vh",display:"flex",flexDirection:"column",
                justifyContent:"space-around"}} key={`cartPackage${paquete._id}`}>
                    <h5>{paquete.nombre}</h5>
                    <h6>${paquete.precio}</h6>
                    <button onClick={()=>agregarAlCarrito(paquete)}>Añadir al carrito</button>
                </div> 
                )}
            </div>
        </>
    )

}

const mapStateToProps = state => {
    return {
        todosLosPaquetes: state.paqueteReducer.todosLosPaquetes
    }
}

const mapDispatchToProps = {
    obtenerTodosLosPaquetes: paqueteActions.obtenerTodosLosPaquetes,
    agregarAlCarrito: carritoActions.agregarAlCarrito
}

export default connect(mapStateToProps, mapDispatchToProps)(CarritoPaquetes)