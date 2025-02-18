'use client'
// MUI Imports
import { useContext } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Type Imports
import { Skeleton } from '@mui/material'

import { SubOrderCxt } from './context'

const ShippingAddress = () => {
  const { orderData: order, orderDataLoading } = useContext(SubOrderCxt)

  if (orderDataLoading) return <Skeleton variant='rectangular' width={'100%'} height={'220px'} />

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <Typography variant='h5'>Shipping Address</Typography>
        </div>
        <div className='flex flex-col'>
          <Typography>{order?.main_order?.address}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShippingAddress
