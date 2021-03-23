import React, { useState } from 'react';
import '../styles/card.css'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';


const PaymentForm = ({setTarjetaValida}) => {

  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')


 
  function largoNumero(e) {
    if (e.target.value.length > 16) 
    {e.target.value = e.target.value.slice(0,16)}
    if((parseInt(number[0])===4 || parseInt(number[0])===5) && number!=="" && number.length===15){
      setTarjetaValida(true)
    }
    else{
      setTarjetaValida(false)}
      setNumber(e.target.value)

  }
  function largoExpiry(e) {
    if (e.target.value.length > 4) 
    {e.target.value = e.target.value.slice(0,4)}
    setExpiry(e.target.value)
  }
  function largoCvc(e) {
    if (e.target.value.length > 3) 
    {e.target.value = e.target.value.slice(0,3)}
    setCvc(e.target.value)
  }
  function largoNombre(e) {
    if (e.target.value.length > 21) 
    {e.target.value = e.target.value.slice(0,21)}
    setName(e.target.value)
  }


console.log(number[0])
  return (
    <div className='PaymentForm'>
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <form>
        <input
          type='tel'
          name='number'
          placeholder='Numero de Tarjeta'
          value={number}
          onChange={e => largoNumero(e)}
          onFocus={e => setFocus(e.target.name)}
        />
        <input
          type='text'
          name='name'
          placeholder='Nombre'
          value={name}
          onChange={e => largoNombre(e)}
          onFocus={e => setFocus(e.target.name)}
        />
        <input
          type='tel'
          name='expiry'
          placeholder='MM/YY Expiracion'
          value={expiry}
          onChange={e => largoExpiry(e)}
          onFocus={e => setFocus(e.target.name)}
        />
        <input
          type='tel'
          name='cvc'
          placeholder='Código de seguridad'
          value={cvc}
          onChange={e => largoCvc(e)}
          onFocus={e => setFocus(e.target.name)}
        />
      </form>
    </div>
  );
}

export default PaymentForm