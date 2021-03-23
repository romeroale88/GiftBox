import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import paqueteActions from '../redux/actions/paqueteActions'
// import Loader from './Loader'
import TarjetaPaquete from './TarjetaPaquete'
import { BiSearch } from 'react-icons/bi'
import { useEffect } from 'react'
import Loader from "../components/Loader"

const Paquetes = ({todosLosPaquetes, todasLasCategorias,categoria,location,obtenerTodosLosPaquetes}) => {
  const ciudades = ["Buenos Aires", "Santa Fe", "Córdoba","Chaco","Corrientes","Rosario","Formosa","Bariloche","Entre Ríos","La Pampa","Mendoza","Dubai"]
  const [paquetesFiltrados,setPaquetesFiltrados]=useState(todosLosPaquetes)
  const [paquetesPrecio,setPaquetesPrecio]=useState(null)
  const [paquetesPersonas,setPaquetesPersonas]=useState(null)
  const [paquetesUbicacion,setPaquetesUbicacion]=useState(null)
  const [paquetesCategorias,setPaquetesCategorias]=useState(location.params)
  const [paquetesNombre,setPaquetesNombre]=useState("")

  useEffect(()=>{
    if(!todosLosPaquetes){obtenerTodosLosPaquetes()}
  },[])
  useEffect(() => {
    if(!todosLosPaquetes){return false}
    var aux=todosLosPaquetes
    {(paquetesPrecio!==null && paquetesPrecio!=="") ? aux=todosLosPaquetes.filter(paquete=>(paquete.precio<=paquetesPrecio))
    :(paquetesPersonas!==null && paquetesPersonas!=="") ? aux=todosLosPaquetes.filter(paquete=>(paquete.cantidadPersonas==paquetesPersonas))
    :(paquetesUbicacion!==null && paquetesUbicacion!=="") ? (aux=todosLosPaquetes.filter(paquete=>(paquete.ubicacion===paquetesUbicacion)))
    :(paquetesCategorias!==null && paquetesCategorias!=="") && (aux=todosLosPaquetes.filter(paquete=>(paquete.categoria===paquetesCategorias)))}
    
    if(paquetesPrecio===null && paquetesPrecio!=="" && paquetesPersonas!==null  && paquetesPersonas!=="" && paquetesUbicacion!==null && paquetesUbicacion!==""){
      var aux1=todosLosPaquetes.filter(paquete=>(paquete.cantidadPersonas==paquetesPersonas))
      aux=aux1.filter(paquete=>paquete.ubicacion===paquetesUbicacion)
    }
    else if(paquetesPersonas===null && paquetesPersonas!=="" && paquetesPrecio!==null  && paquetesPrecio!=="" && paquetesUbicacion!==null && paquetesUbicacion!==""){
      var aux1=todosLosPaquetes.filter(paquete=>(paquete.precio<=paquetesPrecio))
      aux=aux1.filter(paquete=>paquete.ubicacion===paquetesUbicacion)
    }else if(paquetesUbicacion===null && paquetesUbicacion!=="" && paquetesPrecio!==null  && paquetesPrecio!=="" && paquetesPersonas!==null && paquetesPersonas!==""){
      var aux1=todosLosPaquetes.filter(paquete=>(paquete.precio<=paquetesPrecio))
      aux=aux1.filter(paquete=>paquete.cantidadPersonas==paquetesPersonas)
    }
    else if(paquetesUbicacion!==null && paquetesUbicacion!=="" && paquetesPrecio!==null  && paquetesPrecio!=="" && paquetesPersonas!==null && paquetesPersonas!==""){
      var aux1=todosLosPaquetes.filter(paquete=>(paquete.precio<=paquetesPrecio))
      var aux2=aux1.filter(paquete=>paquete.cantidadPersonas==paquetesPersonas)
      aux=aux2.filter(paquete=>paquete.ubicacion===paquetesUbicacion)
    }
    if(paquetesCategorias!==null && paquetesCategorias!==""){
      aux=aux.filter(paquete=>paquete.categoria===paquetesCategorias)
    }
    if(paquetesNombre!==""){aux=aux.filter(paquete=> paquete.nombre.toUpperCase().indexOf(paquetesNombre.toUpperCase().trim())===0)}
    setPaquetesFiltrados(aux)
  }, [paquetesPrecio,paquetesPersonas,paquetesUbicacion,paquetesNombre,paquetesCategorias])
  if(!todosLosPaquetes){return <Loader/> }
  
  return (
    <main className='packagesMain'>
      <input type="text" placeholder="Buscar por nombre" onChange={(e)=>setPaquetesNombre(e.target.value)}/>
      <div className="filterInput">
        <select id='select1' name="categoria" onChange={(e)=>setPaquetesCategorias(e.target.value)} >
          <option value=""  >Todos las categorías</option>
          {todasLasCategorias && todasLasCategorias.map(categoria => 
          {if(location.params===categoria.nombre){return <option selected={categoria.nombre} value={categoria.nombre}>{categoria.nombre}</option>}
          else{return <option  value={categoria.nombre}>{categoria.nombre}</option>}
          })}
        </select>

        <select id='select2' name="precio"  onChange={(e)=>setPaquetesPrecio(e.target.value)}>
          <option className="option"  value="">Precios</option>
          <option  value="2000">Menos de $2000</option>
          <option  value="5000">Menos de $5000</option>
          <option  value="10000">Menos de $10000</option>
        </select>

        <select id='select3' name="cantidadPersonas"  onChange={(e)=>setPaquetesPersonas(e.target.value)} >
          <option value="">Cantidad de personas</option>
          {[...Array(4)].map((m, i) => <option value={i + 1}>{i + 1}</option>)}
        </select>

        <select id='select4' name="ubicacion"  onChange={(e)=>setPaquetesUbicacion(e.target.value)}>
          <option value="" >Ubicación</option>
          {ciudades.map(ciudad => <option value={ciudad}>{ciudad}</option>)}
        </select>

        <div className="centerCenterRow searchButton"><BiSearch /></div>
      </div>
      <div className='packagesContainer'>
        {(paquetesFiltrados&& paquetesFiltrados.length!==0) 
        ? paquetesFiltrados.map(paquete => {
          return <TarjetaPaquete paquete={paquete} key={`paquete${paquete._id}`} />
        })
        : <div style={{height:"50vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <h2>No hay resultados para tu búsqueda. Probá hacerla menos específica o limpiar los filtros</h2>
          </div>
        }
        
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    todosLosPaquetes:state.paqueteReducer.todosLosPaquetes,
    todasLasCategorias: state.categoriaReducer.todasLasCategorias
  }
}

const mapDispatchToProps = {
  filtrarPaquetes: paqueteActions.filtrarPaquetes,
  obtenerTodosLosPaquetes: paqueteActions.obtenerTodosLosPaquetes
}

export default connect(mapStateToProps, mapDispatchToProps)(Paquetes)