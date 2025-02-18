'use client'
import { useCallback, useContext } from 'react'

import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'

import { TrackingMapCxt } from './TrackingMapCxt'

export default function TrackingMapFilters() {
  const { trackedUsersList, mainOrdersData, searchParams, handleSetSearchParams } = useContext(TrackingMapCxt)

  const OrdersList = useCallback(() => {
    if (Array.isArray(trackedUsersList)) {
      const _orders: number[] = []

      trackedUsersList
        ?.filter(ele => ele.latitude && ele.longitude)
        ?.map(ele => {
          if (_orders.indexOf(ele.id) == -1) {
            _orders.push(ele.id)
          }
        })

      return _orders
    }
  }, [trackedUsersList])

  const orders = OrdersList()

  return (
    <Stack direction={'row'} spacing={2} my={3}>
      <FormControl fullWidth>
        <InputLabel id='person-type-label'>Type</InputLabel>
        <Select
          labelId='person-type-label'
          id='person-type'
          label='Type'
          onChange={e => {
            handleSetSearchParams({ ...searchParams, user_type: e.target.value + '' })
          }}
        >
          <MenuItem value={'-1'}>All</MenuItem>
          <MenuItem value={'vendor'}>Vendor</MenuItem>
          <MenuItem value={'delivery'}>Delivery</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='delivery-list-label'>Delivery Man</InputLabel>
        <Select
          labelId='delivery-list-label'
          id='delivery-list'
          label='Delivery Man'
          onChange={e => {
            handleSetSearchParams({ ...searchParams, delivery_id: e.target.value + '' })
          }}
        >
          <MenuItem value={-1}>All</MenuItem>
          {trackedUsersList
            ?.filter(ele => ele.latitude && ele.longitude)
            ?.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.user_name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='order-list-label'>Order</InputLabel>
        <Select
          labelId='order-list-label'
          id='order-list'
          label='Order'
          onChange={e => {
            handleSetSearchParams({ ...searchParams, order_id: e.target.value + '' })
          }}
        >
          <MenuItem value={-1}>All</MenuItem>
          {(OrdersList() ?? [])?.map(order => (
            <MenuItem key={order} value={order}>
              <b>Order #{order}</b>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}
