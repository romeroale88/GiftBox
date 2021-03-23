import React from 'react'
import { AiOutlineShop } from 'react-icons/ai'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { FiBriefcase } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io'
import { FaFacebookF } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footerArriba">
                    <div className="footerArribaItem">
                        <AiOutlineShop className="iconoFooterArriba" />
                        <p>Puntos de venta</p>
                    </div>
                    <span>|</span>
                    <div className="footerArribaItem">
                        <AiOutlineQuestionCircle className="iconoFooterArriba" />
                        <p>Necesitas ayuda? Escribinos</p>
                    </div>
                    <span>|</span>
                    <div className="footerArribaItem">
                        <FiBriefcase className="iconoFooterArriba" />
                        <p>Venta Corporativa</p>
                    </div>
                </div>
                <div className="footerMedio">
                    <div className="fraseFooter">
                        <p>Regalamos porque ver felices a los nuestros <span className="fraseFooterColor">nos hace muy felices.</span></p>
                    </div>
                    <div className="seccionesMedioFooterPadre">
                        <div className="seccionesMedioFooter">
                            <h3 className="regalosFooter">Regalos</h3>
                            <Link to="/paquetes">
                                <p>Toc-Toc! En Casa</p>
                            </Link>
                            <Link to="/paquetes">
                                <p>Ñam! Gastronomía</p>
                            </Link>
                            <Link to="/paquetes">
                                <p>Omm! Estar Bien</p>
                            </Link>
                            <Link to="/paquetes">
                                <p>Ahh! Aventura</p>
                            </Link>
                            <Link to="/paquetes">
                                <p>Wow! Estadías</p>
                            </Link>
                            <Link to="/paquetes">
                                <p>Jaja! Entretenimiento</p>
                            </Link>
                            <Link to="/paquetes">
                                <p>Mix! Blends</p>
                            </Link> 
                        </div>
                        <div className="seccionesMedioFooter">
                            <h3 className="regalosFooter">Ayuda</h3>
                            <p>Contacto</p>
                            <p>Preguntas Frecuentes</p>

                        </div>
                        <div className="seccionesMedioFooter">
                            <h3 className="regalosFooter">GiftBox</h3>
                            <Link to="/queEsGiftBox">
                                <p>¿Que es GiftBox?</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footerAbajo">
                    <p>Políticas y garantías</p>
                    <p>Términos y condiciones</p>
                    <div className="devolverCompraButton">
                        <p>Devolver mi Compra</p>
                    </div>
                    <span>|</span>
                    <div className="partnersButton">
                        <p>Partners</p>
                    </div>
                    <div className="redesFooter">
                        <IoLogoInstagram className="iconoFooter" />
                        <FaFacebookF className="iconoFooter" />
                    </div>


                </div>
            </div>
        </>
    )
}

export default Footer