'use client'
// MUI Imports
import { useContext } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Skeleton } from '@mui/material'

// Component Imports

// Util Imports
import { SubOrderCxt } from './context'

const CustomerDetails = () => {
  const { orderData: order, orderDataLoading } = useContext(SubOrderCxt)

  if (orderDataLoading) return <Skeleton variant='rectangular' width={'100%'} height={'220px'} />

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='h5'>Customer details</Typography>
        <div className='flex items-center gap-3'>
          <Avatar>{order?.main_order?.client?.user_name?.slice(0, 2)}</Avatar>
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {order?.main_order?.client?.user_name}
            </Typography>
            <Typography>Customer ID: #{order?.main_order?.client?.id}</Typography>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography color='text.primary' className='font-medium'>
              Contact info
            </Typography>
          </div>
          <Typography>Email: {order?.main_order?.client?.email}</Typography>
          <Typography>Mobile: {order?.main_order?.client?.phone}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerDetails
