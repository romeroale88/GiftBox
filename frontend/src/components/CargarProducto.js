import React, { useState } from 'react'
import { connect } from 'react-redux'
import productoActions from '../redux/actions/productoActions'
import Swal from 'sweetalert2'

const CargarProducto = (props) => {
    console.log(props)
    const [errors,setErrors] = useState([])
    const [producto, setProducto]=useState({})

    const readInput = e=>{

        const property= e.target.name
        var value = e.target.value
        console.log(value)
/*         if(property==="imagen"){
            value=e.target.files[0];
        } */
        setProducto({
            ...producto,
            [property]:value
        })
    }
    const sendData = async (e) =>{
        setErrors([])
        e.preventDefault()
        const{nombre,precio,fecha,categoria,descripcion, cantidadPersonas,ubicacion,stock,imagen,paqueteId} = producto

        const nuevoProducto = new FormData()

        nuevoProducto.append("nombre", nombre)
        nuevoProducto.append("precio", precio)
        nuevoProducto.append("fecha", fecha)
        nuevoProducto.append("categoria", categoria)
        nuevoProducto.append("descripcion", descripcion)
        nuevoProducto.append("cantidadPersonas", cantidadPersonas)
        nuevoProducto.append("ubicacion", ubicacion)
        nuevoProducto.append("stock", stock)
        nuevoProducto.append("imagen", imagen)
        nuevoProducto.append("paqueteId", paqueteId)
        if(nombre ==="" || precio==="" || fecha==="" || categoria ==="" || descripcion==="" || cantidadPersonas ==="" || ubicacion === "" || stock  === "" || imagen  === "" ){
            setErrors([{mensaje: "Todos los campos deben ser completados"}])
            return false
        } 
        await props.cargarProducto(nuevoProducto)
        Swal.fire({
            icon: 'success',
            title: 'Excelente!',
            text: 'Nuevo Producto añadido!',
          })
    }
    var categorias=["Aventura", "Blends", "En Casa","Entretenimiento", "Estadías", "Gastronomía", "Estar bien"]
    return(
    <form className="adminCargaForm">
        <label>Nombre del producto</label>
        <input type="text" name="nombre" onChange={readInput}></input>
        <label>Precio del producto</label>
        <input type="number" name="precio" onChange={readInput}></input>
        <label>Fecha del producto</label>
        <input type="date" name="fecha" onChange={readInput}></input>
        <label>Categoría</label>
        <select type="text" name="categoria" onChange={readInput}>
            <option defaultValue='' disabled={true} selected={true}>Seleccionar Categoría</option>
            {categorias.map(categoria =>{
               return <option key={categoria} value={categoria}>{categoria}</option>
            })}
        </select>
        <label>Paquete</label>
        <select type="text" name="paqueteId" onChange={readInput}>
            <option defaultValue='' disabled={true} selected={true}>Seleccionar Paquete</option>
            {props.todosLosPaquetes.map(paquete =>{
               return <option key={paquete.nombre} value={paquete._id}>{paquete.nombre}</option>
            })}
        </select>
        <label>Descripción del producto</label>
        <textarea type="text" name="descripcion" onChange={readInput}></textarea>
        <label>Cantidad de personas</label>
        <input type="number" name="cantidadPersonas" onChange={readInput}></input>
        <label>Ubicación</label>
        <input type="text" name="ubicacion" onChange={readInput}></input>
        <label>Stock</label>
        <input type="number" name="stock" onChange={readInput}></input>
        <label>Imagen del producto (url)*</label>
        <input type="text" name="imagen" onChange={readInput}></input>
        <button onClick={sendData}>Enviar</button>
   </form>
    )
}

const mapStateToProps = state =>{
    return{
        loggedUser : state.userReducer.loggedUser,
        todosLosPaquetes: state.paqueteReducer.todosLosPaquetes
    }
}
const mapDispatchToProps = {
    cargarProducto: productoActions.cargarProducto
}
    
export default connect(mapStateToProps, mapDispatchToProps)(CargarProducto)