import React, {useEffect, useRef} from 'react'
import { connect } from "react-redux"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import carritoActions from "../redux/actions/carritoActions"


const PayPal = ({total,carrito, eliminarDelCarrito}) => {

    function botonComprar() {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
        title: <p className="popup" style={{color:"black", fontSize:15}}>Su compra fue realizada con éxito! :D</p>,
        icon:'success',
        toast: true,
        timer:4000,
        timerProgressBar:true,
        showConfirmButton:false,
        width:500, 
        background: '#d8f6d3',
        iconColor: '#2fbc13'                                        
        })
        carrito.map(paquete => eliminarDelCarrito(paquete)) 
    }

    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons ({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{description: "Compra" ,amount: {value: total ,currency_code:"USD"}}],
                })
            },
            onApprove: (data, actions) =>{
                const order = actions.order.capture()
                botonComprar()
            },
            onError: (err) => {
                alert("ERROR")
                console.log(err)
            }
        }).render(paypal.current)
        
    })
    return(
        <div ref={paypal}></div>
    )
}

const mapDispatchToProps={
    eliminarDelCarrito: carritoActions.eliminarDelCarrito
}
export default connect(null, mapDispatchToProps)(PayPal)
