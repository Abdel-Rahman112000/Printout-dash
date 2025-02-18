'use client'

import React, { useContext, useState } from 'react'

import { Stack } from '@mui/material'

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

import { TrackingMapCxt } from './TrackingMapCxt'

import './TrackingMapLoader.css'
import type { TrackkingUserType } from '@/utils/api/tracking-map/tarcking-map-data'

const containerStyle = {
  width: '100%',
  height: '80vh'
}

function TrackingGoogleMap() {
  const [selectedUser, setSelectedUser] = useState<TrackkingUserType | null>(null)
  const { trackingDataLoading, trackedUsersList, searchParams } = useContext(TrackingMapCxt)

  if (trackingDataLoading) {
    return (
      <Stack width={'100%'} height={'80vh'} alignItems={'center'} justifyContent={'center'}>
        <div className='loader'></div>
        <div className='textLoader'></div>
      </Stack>
    )
  }

  console.log('searchParamssearchParams', searchParams)

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? ''}>
      <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 30.0444, lng: 31.2357 }} zoom={10}>
        {/* show markers */}
        {trackedUsersList
          ?.filter(ele => ele.latitude && ele.longitude)
          ?.filter(ele => {
            if (searchParams?.user_type && searchParams?.user_type != '-1')
              return searchParams.user_type == ele.user_type

            return true
          })
          ?.filter(ele => {
            if (searchParams?.delivery_id && searchParams?.delivery_id != '-1' && ele.user_type != 'vendor')
              return ele.id.toString() == searchParams?.delivery_id

            return true
          })
          ?.filter(ele => {
            if (searchParams?.order_id && searchParams?.order_id != '-1') {
              if (Array.isArray(ele.orders)) {
                return ele.orders.findIndex(_item => _item.id == searchParams?.order_id) != -1
              } else {
                return false
              }
            }

            return true
          })
          .map(user => (
            <Marker
              key={user.id}
              onClick={() => setSelectedUser(user)}
              position={{ lat: +user.latitude, lng: +user.longitude }}
            />
          ))}

        {/* dialog to show information to see selected user informaTION */}
        {selectedUser && (
          <InfoWindow
            position={{ lat: +selectedUser.latitude, lng: +selectedUser.longitude }}
            onCloseClick={() => setSelectedUser(null)}
          >
            <div>
              <h4>Name:{selectedUser.user_name}</h4>
              <h5>Email:{selectedUser.email}</h5>
              <h6>Phone:{selectedUser.phone}</h6>
              <h6>Type:{selectedUser.user_type === 'vendor' ? 'Vendor' : 'Delivery'}</h6>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default TrackingGoogleMap
