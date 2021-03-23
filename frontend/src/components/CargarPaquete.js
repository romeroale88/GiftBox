import React, { useState } from 'react'
import { connect } from 'react-redux'
import paqueteActions from '../redux/actions/paqueteActions'
import Swal from "sweetalert2"


const CargarPaquete = (props) => {
    const [errors, setErrors] = useState([])
    const [paquete, setPaquete] = useState({})

    const readInput = e => {
        const property = e.target.name
        var value = e.target.value
        /*         if(property==="imagen"){
                    value=e.target.files[0];
                } */
        setPaquete({
            ...paquete,
            [property]: value
        })
    }
    console.log(paquete)
    const sendData = async (e) => {
        setErrors([])
        e.preventDefault()
        const { nombre, precio, fecha, categoria, descripcion, cantidadPersonas, ubicacion, stock, imagen } = paquete

        const nuevoPaquete = new FormData()

        nuevoPaquete.append("nombre", nombre)
        nuevoPaquete.append("precio", precio)
        nuevoPaquete.append("fecha", fecha)
        nuevoPaquete.append("categoria", categoria)
        nuevoPaquete.append("descripcion", descripcion)
        nuevoPaquete.append("cantidadPersonas", cantidadPersonas)
        nuevoPaquete.append("ubicacion", ubicacion)
        nuevoPaquete.append("stock", stock)
        nuevoPaquete.append("imagen", imagen)
        if (nombre === "" || precio === "" || fecha === "" || categoria === "" || descripcion === "" || cantidadPersonas === "" || ubicacion === "" || stock === "" || imagen === "") {
            setErrors([{ mensaje: "Todos los campos deben ser completados" }])
            return false
        }
        await props.enviarNuevoPaquete(nuevoPaquete)
        Swal.fire({
            icon: 'success',
            title: 'Excelente!',
            text: 'Nuevo Paquete añadido!',
        })
    }
    var categorias = ["Aventura", "Blends", "En Casa", "Entretenimiento", "Estadías", "Gastronomía", "Estar bien"]
    return (
        <form className="adminCargaForm">
            <label>Nombre del paquete</label>
            <input type="text" name="nombre" onChange={readInput}></input>
            <label>Precio del paquete</label>
            <input type="number" name="precio" onChange={readInput}></input>
            <label>Fecha del paquete</label>
            <input type="date" name="fecha" onChange={readInput}></input>
            <label>Categoría</label>
            <select type="date" name="categoria" onChange={readInput}>
                <option value='' disabled='true' selected='true'>Select Category</option>
                {categorias.map(categoria => {
                    return <option key={categoria} value={categoria}>{categoria}</option>
                })}
            </select>
            <label>Descripción del paquete</label>
            <textarea type="text" name="descripcion" onChange={readInput}></textarea>
            <label>Cantidad de personas</label>
            <input type="number" name="cantidadPersonas" onChange={readInput}></input>
            <label>Ubicación</label>
            <input type="text" name="ubicacion" onChange={readInput}></input>
            <label>Stock</label>
            <input type="number" name="stock" onChange={readInput}></input>
            <label>Imagen del paquete (url)*</label>
            <input type="text" name="imagen" onChange={readInput}></input>
            <button onClick={sendData}>Enviar</button>
        </form>
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.userReducer.loggedUser
    }
}
const mapDispatchToProps = {
    enviarNuevoPaquete: paqueteActions.nuevoPaquete
}
export default connect(mapStateToProps, mapDispatchToProps)(CargarPaquete)