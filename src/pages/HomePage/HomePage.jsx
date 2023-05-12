import React from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'

function HomePage({ apiKey, baseUrl }) {

  return (
    <div className='homepage-container'>
        <Slider apiKey={apiKey} baseUrl={baseUrl}/>
    </div>
  )
}

export default HomePage