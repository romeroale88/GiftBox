import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { BsFillStarFill } from 'react-icons/bs'

const TarjetaPaquete = ({ paquete }) => {
  return (
    <Link to={`/paquete/${paquete._id}`}>
      <div className='package' key={`paq${paquete._id}`}>
        <div className='packageImage' style={{backgroundImage: `url(${paquete.imagen})`}}>
          <div className='packageCategoryContainer'>
            <div className='categoryContainer'>
              <p>{paquete.categoria}</p>
            </div>
            <div className='giftBoxImage'>
              <p>GIFT</p>
              <p>BOX</p>
            </div>
          </div>
        </div>
        <div className='packageDataContainer'>
          <div className='packageData'>
            <div className='starsAndAssessment'>
              <p>{paquete.valoracion.length}</p>
              {[...Array(5)].map((m, i) => {
                const ratingValue = i + 1
                return (
                  <label key={`label${i}`}>
                    <BsFillStarFill className="star" color='#ffc107' />
                  </label>
                )
              })}
            </div>
            <div className='packageDescription'>
              <p>{paquete.descripcion.slice(0,60)+"..."}</p>
            </div>
            <p className='price'>${paquete.precio}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TarjetaPaquete