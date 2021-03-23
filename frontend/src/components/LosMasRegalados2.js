import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import categoriaActions from "../redux/actions/categoriaActions";
import { connect } from "react-redux";
import {BsFillStarFill} from 'react-icons/bs'
import { Link } from "react-router-dom";

const LosMasRegalados2 = ({todosLosPaquetes, todasLasCategorias}) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  const paquetesMasVendidos = []
  todosLosPaquetes && todosLosPaquetes.map(paquete => {
    let cantidadUnidades = 0
    let promedioValoraciones = 0
    var valoracionPaquete = 0
    paquete.cantidadVendidos.map(venta => {
      cantidadUnidades = cantidadUnidades + venta.cantidad
    })
    paquete.valoracion.map(valoracion => {
      valoracionPaquete = valoracionPaquete + valoracion.valor
    })
    promedioValoraciones = (valoracionPaquete / paquete.valoracion.length)
    console.log(paquete.valoracion.length)
    paquetesMasVendidos.push({
      nombre: paquete.nombre,
      promedioValoraciones,
      precio: paquete.precio,
      imagen: paquete.imagen,
      descripcion: paquete.descripcion,
      cantidadUnidades,
      id: paquete._id
    })
  })

  todosLosPaquetes && paquetesMasVendidos.sort((a, b) => b.cantidadUnidades - a.cantidadUnidades)

  return (
    <div className='containerImg2' style={{ width: '90vw'}}>
      <Slider {...settings}>
        {todosLosPaquetes && paquetesMasVendidos.map(function (paquete, i)  {
          return (
            <div className='loMasRegalado' style={{ width: '35vw' }} key={`img${i}`}>
              <Link to={`/paquete/${paquete.id}`}> 
              <div className="loMasRegaladoImagenResponsive" style={{ backgroundImage: `url('${paquete.imagen}')`, height: '35vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end' }}>
              </div>
              <div style={{margin:'15px 0 0 10px'}}>{[...Array(5)].map((m,i)=>{
                        const ratingValue = i +1
                            return (
                                <label key={`label${i}`}> 
                                    <BsFillStarFill className="star" color='#ffc107'/>
                                </label>
                            )
                        })}</div>
              <div className='precioDetalle'>
                <p style={{height: '5vh', marginBottom: '1vh'}}>{paquete.descripcion.slice(0, 62)+"..."}</p>
                <p className='precio' style={{paddingBottom: '1vh'}}>$ {paquete.precio}</p>
              </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    todasLasCategorias: state.categoriaReducer.todasLasCategorias,
    todosLosPaquetes: state.paqueteReducer.todosLosPaquetes
  }
}

const mapDispatchToProps = {
  obtenerTodasLasCategorias: categoriaActions.obtenerTodasLasCategorias
}

export default connect(mapStateToProps, mapDispatchToProps)(LosMasRegalados2)