/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { VectorMap } from '@react-jvectormap/core'
import { worldMill } from '@react-jvectormap/world'
import React from 'react'
import "./worldMap.css"


const WorldMap = ({mapRef}) => {
  return (
    <div className='px-4 my-10'>
    <VectorMap map={worldMill} backgroundColor='#FFF' style={{height:'328px', width:'100%'}} regionStyle={{initial:{fill:'#F0F0F0'}, hover:{fill:'#BBDEFB',fillOpacity:1},selected:{fill:'#BBDEFB',fillOpacity:1}}} mapRef={mapRef} />
    </div>
  )
}

export default WorldMap