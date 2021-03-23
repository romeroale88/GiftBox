import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import categoriaActions from "../redux/actions/categoriaActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const fotos = [{ img: 'https://fotos.subefotos.com/56c90e1f86df75fcfc6a019320c6deefo.png', text: 'Aventura', color: '#FFC715' }, { img: 'https://fotos.subefotos.com/32bf744cf1edec87692e8e32b04b89d8o.jpg', text: 'Blends', color: '#30d42a' }, { img: 'https://fotos.subefotos.com/26d409700fdaa30b2a9c9d51283b0fd8o.jpg', text: 'En casa', color: '#CA360C' }, { img: 'https://fotos.subefotos.com/654fee5dbf75e34d3e4b9d362705b774o.jpg', text: 'Entretenimiento', color: '#C7BBEC' }, { img: 'https://fotos.subefotos.com/e606178ce6f8e48f545dc3b053324f59o.jpg', text: 'Estadias', color: '#43DCB7' }, { img: 'https://i.postimg.cc/DfR65MtV/Estar-bien.jpg', text: 'Estar bien', color: '#B6B6EF' }, { img: 'https://fotos.subefotos.com/75ba75aa9a87f616e495467ec2ec2746o.jpg', text: 'Gastronomia', color: '#FF4F6D' }]

const Carrousel = ({ todasLasCategorias }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return (
    <div className='containerImg' style={{ width: '90%', minHeight: '80vh', margin: 'auto' }}>
      <Slider {...settings}>
        {todasLasCategorias.map(function (categoria, i) {
          return (
            <Link to={{pathname:'/paquetes', params:categoria.nombre}}  key={`linkCat${categoria._id}`}>
              <div className='imgCarrusel' style={{ width: '35vw' }} key={`img${i}`}>
                <div className='imgCarruselHijo' style={{ backgroundImage: `url('${categoria.imagen}')`, height: '75vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end' }}>
                  <h3 className="nombreCategoria" style={{  color: `${categoria.color}`,
                                                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                            width: "100%",
                                                            height: "8vh",
                                                            paddingTop: "1.2vh",
                                                            paddingLeft: "1vw",
                                                            borderTop: "2px solid tomato"}}>{categoria.nombre}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    todasLasCategorias: state.categoriaReducer.todasLasCategorias,
  }
}

const mapDispatchToProps = {
  obtenerTodasLasCategorias: categoriaActions.obtenerTodasLasCategorias
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrousel)

