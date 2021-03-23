import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hamburger from 'hamburger-react'
import "../App.css"
import { IoCartOutline } from 'react-icons/io5'
import { MdKeyboardArrowDown } from 'react-icons/md'
import PaquetesHeader from './PaquetesHeader'
import { connect } from 'react-redux'
import userActions from "../redux/actions/userActions"
import { GoSignOut,GoSettings,GoHome,GoGift,GoQuestion,GoOrganization,GoTools } from "react-icons/go";


const Header = ({ carrito, loggedUser, logOut }) => {
    const [mostrarProductos, setMostrarProductos] = useState(true)
    const [visible, setVisible] = useState(false)
    const [isOpen, setOpen] = useState(false)
    console.log(loggedUser)
    return (
        <>
            <div id="headerContainer">
                <Link to='/'><div style={{ backgroundImage: `url("../assets/giftLogoF-01.png")` }} className='logoContainer'></div></Link>
                <div className="paquetesHeader">
                    <PaquetesHeader />
                </div>
                <div className="headerUser centerVerticalColumn">

                    <div className="abrirRegalo centerCenterRow">
                        <Link to="/regalo"><span><GoGift/></span>Abrir mi Regalo</Link>
                        {!loggedUser &&
                            <Link to="/registro" className="registroHeader"><span><GoOrganization/></span>Registrarse</Link>
                        }
                    </div>
                    <div className="headerUserBottom spaceBetween">
                        {loggedUser ?
                            <>
                                <Link>
                                    <div className="centerCenterRow userName">
                                        <div className="headerTituloPaquetes" onClick={() => setVisible(!visible)}>
                                            <div className="flexRowUsuarios">
                                                <div className="userNav">
                                                    <div className="datosUser" >
                                                        {loggedUser.googleUser === "true"
                                                            ? <div id="userImg" style={{ backgroundImage: `url(${loggedUser.imagen})` }} />
                                                            : <div id="userImg" style={{ backgroundImage: `url("../usuarioImg/${loggedUser.imagen}")` }} />
                                                        }
                                                        <p>{loggedUser.nombre}</p>
                                                        <MdKeyboardArrowDown />
                                                    </div>

                                                    {visible &&
                                                        <div className="linksUsuario">
                                                            <Link to="/usuario" className="logOut paquetesPadres">Mi cuenta</Link>
                                                            <Link to="/editUsuario" className="logOut paquetesPadres">Editar Usuario</Link>
                                                            <Link to="/" onClick={logOut} className="logOut paquetesPadres">LogOut</Link>
                                                            {loggedUser.rol === 'admin' &&
                                                                <Link to="/admin" className="logOut paquetesPadres">Página de Administrador</Link> 
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </>
                            :
                            <>
                                <div className="headerUserImg" style={{ backgroundImage: `url("../assets/58670.jpg")` }} />
                                <Link to="/iniciarsesion">
                                    <div className="centerCenterRow userName">
                                        <div id="userImg" style={{ backgroundImage: `url("../assets/images.png")` }} />
                                        <p>Mi perfil</p>
                                        <div className="centerCenterRow"><MdKeyboardArrowDown /></div>
                                    </div>
                                </Link>
                            </>
                        }
                        
                            <Link to="/carrito">
                                <div className="cart centerCenterRow ">
                                    <IoCartOutline style={{marginRight: '1vw'}}/>
                                    <p style={{color: 'white', paddingRight: '0.3vw'}}>{carrito.length}</p>
                                </div>
                            </Link>
                        
                    </div>
                </div>
                <div className="headerResponsive">
                    <Hamburger toggled={isOpen} toggle={setOpen} direction="right" easing="ease-in"/>
                </div>


            </div>
            {isOpen &&
                <div className="itemsHeaderResponsive" style={{ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }}>
                    {loggedUser
                        ? <div className="linksUsuarioResponsive">
                            <div className="userHeaderResponsive" style={{marginBottom: '2vh', marginTop: '2vh'}}>
                                {loggedUser.googleUser === "true"
                                    ? <div id="userImg" style={{ backgroundImage: `url(${loggedUser.imagen})` }} />
                                    : <div id="userImg" style={{ backgroundImage: `url("../usuarioImg/${loggedUser.imagen}")` }} />}
                                <p style={{fontSize: '20px' }}> Bienvenido! {loggedUser.nombre}</p>
                            </div>
                            <div className="lineaHamburguesa"></div>
                            {loggedUser.rol === 'admin' &&
                            <> 
                                <Link to="/admin" style={{fontSize: '20px', marginBottom: '3vh', marginTop: '3vh'}} onClick={() => setOpen(false)}><GoTools style={{fontSize: '30px', marginRight: '2vw'}}/>Admin</Link>
                                <div className="lineaHamburguesa"></div>
                            </>    
                            }
                            <Link to="/" onClick={logOut} style={{fontSize: '20px', marginBottom: '3vh', marginTop: '3vh'}}><GoSignOut style={{fontSize: '30px', marginRight: '2vw'}}/>LogOut</Link>
                            <div className="lineaHamburguesa"></div>
                            <Link to="/editUsuario"  style={{fontSize: '20px', marginBottom: '3vh', marginTop: '3vh'}} onClick={() => setOpen(false)}><GoSettings style={{fontSize: '30px', marginRight: '2vw'}}/>Editar Usuario</Link>
                            <div className="lineaHamburguesa"></div>
                            <Link to="/" style={{fontSize: '20px', marginBottom: '3vh', marginTop: '3vh'}} onClick={() => setOpen(false)}>
                                    <GoHome style={{fontSize: '30px', marginRight: '2vw'}}/>Home
                            </Link>
                            <div className="lineaHamburguesa"></div>
                            <Link to="/paquetes" style={{fontSize: '20px', marginBottom: '3vh', marginTop: '3vh'}} onClick={() => setOpen(false)}>
                                    <GoGift style={{fontSize: '30px', marginRight: '2vw'}}/>Paquetes
                            </Link>
                            <div className="lineaHamburguesa"></div>
                            <Link to="/queEsGiftBox" style={{fontSize: '20px', marginBottom: '3vh', marginTop: '3vh'}} onClick={() => setOpen(false)} >
                                    <GoQuestion style={{fontSize: '30px', marginRight: '2vw'}}/>Que es Gift Box?
                            </Link>
                        </div>
                        : 
                        <>
                        <div>
                            <Link to="/iniciarsesion"  >
                                <div onClick={() => setOpen(false)} className="userNameResponsive">
                                    <div id="userImg" style={{ backgroundImage: `url("../assets/images.png")` }} />
                                    <p onClick={() => setOpen(false)} style={{fontSize: '20px'}}>Mi perfil</p>
                                    <div className="centerCenterRow"><MdKeyboardArrowDown /></div>
                                </div>
                            </Link>
                        </div>
                        
                        <div style={{display: 'flex', flexDirection: 'column', marginTop: '5vh', marginLeft: '4vw'}}>
                            <Link to="/" style={{fontSize: '20px', marginBottom: '3vh', marginTop:'3vh'}} onClick={() => setOpen(false)}>
                                    <GoHome style={{fontSize: '30px', marginRight: '2vw'}}/>Home
                            </Link>
                            <div className="lineaHamburguesa"></div>
                            <Link to="/paquetes" style={{fontSize: '20px', marginBottom: '3vh', marginTop:'3vh'}} onClick={() => setOpen(false)}>
                                    <GoGift style={{fontSize: '30px', marginRight: '2vw'}}/>Paquetes
                            </Link>
                            <div className="lineaHamburguesa"></div>
                            <Link to="/queEsGiftBox" style={{fontSize: '20px', marginBottom: '3vh', marginTop:'3vh', width: '50vw'}} onClick={() => setOpen(false)}>
                                    <GoQuestion style={{fontSize: '30px', marginRight: '2vw', }}/>Que es Gift Box?
                            </Link>
                        </div>
                        </>
                        }
                </div>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        carrito: state.carritoReducer.carrito,
        loggedUser: state.userReducer.loggedUser
    }
}

const mapDispatchToProps = {
    logOut: userActions.logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
