import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import Carrousel from '../components/Carrousel'
import Carrousel2 from '../components/Carrousel2'
import video from '../assets/videoHome.mp4'
import paqueteActions from '../redux/actions/paqueteActions'
import { connect } from 'react-redux'
import LosMasRegalados from '../components/LosMasRegalados'
import LosMasRegalados2 from '../components/LosMasRegalados2'

const Home = ({paquetesMasRegalados, filtrarPaquetesMasReg}) => {
    useEffect(() => {
      filtrarPaquetesMasReg()
    }, [])

    return (
        <>  
            <video src={video} autoPlay loop muted></video>
            
            <div className="homeVideo" style={{width:'100%',height:'100vh',display:'flex',alignItems:'center'}}>
                <div className="tituloHomeVideoPadre" style={{paddingLeft:'10vh'}}>
                    <h1 className="tituloHomeVideo" style={{color:'white',fontSize:'60px',fontWeight:'bold'}}>Regalá experiencias.</h1>
                    <p  className="textoHomeVideo" style={{color:'white',fontSize:'20px'}}>Sorprendé con momentos para vivir dentro y fuera de casa.</p>
                    <div className="botonesVideoHome"style={{display:'flex', width:'35vw',justifyContent:'space-between',marginTop:'10vh'}}>
                        <p className='botonVideo'>Regala una GiftBox</p>
                        <p className='botonVideo'><Link to="/regalo" style={{color:"white"}}>Abri tu regalo</Link></p>
                    </div>
                </div>
            </div>
            <div style={{marginTop:'5vh'}}>
                <Carrousel />
                <Carrousel2 />
            </div>
            <div>
                <h2 className="losMasRegalados">Lo mas regalados</h2>
                <LosMasRegalados />
                <LosMasRegalados2 />
            </div>
        </>
    )
}

const mapStateToProps = state => {
  return {
    paquetesMasRegalados: state.paqueteReducer
  }
}

const mapDispatchToProps = {
  filtrarPaquetesMasReg: paqueteActions.filtrarPaquetesMasReg
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)