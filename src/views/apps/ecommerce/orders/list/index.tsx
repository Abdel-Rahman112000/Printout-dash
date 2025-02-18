'use client'
// MUI Imports
import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

// Type Imports

// Component Imports
import { getSession } from 'next-auth/react'

import OrderCard from './OrderCard'
import { SingleMainOrderCxtProvider } from './context/SingleMainOrderCxt'
import OrderListTable from './OrderListTable'

const OrdersListOfMainOrder = () => {
  return (
    <SingleMainOrderCxtProvider>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <OrderCard />
        </Grid>
        <Grid item xs={12}>
          <OrderListTable />
        </Grid>
      </Grid>
    </SingleMainOrderCxtProvider>
  )
}

export default OrdersListOfMainOrder
