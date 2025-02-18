'use client'

import React, { useState } from 'react'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '300px'
}

function GoogleMapComponent(props: PropsType) {
  const { marker, setMarker } = props

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newMarker = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }

      setMarker(newMarker)
    }
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 30.0444, lng: 31.2357 }}
        zoom={10}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  )
}

type PropsType = {
  marker:
    | {
        lat: number
        lng: number
      }
    | undefined
  setMarker: React.Dispatch<
    React.SetStateAction<
      | {
          lat: number
          lng: number
        }
      | undefined
    >
  >
}
export default GoogleMapComponent
