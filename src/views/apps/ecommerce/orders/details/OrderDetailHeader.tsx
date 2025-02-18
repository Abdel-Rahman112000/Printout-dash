'use client'
// MUI Imports
import { useContext, useEffect, useState } from 'react'

import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// Type Imports
import moment from 'moment'

import { Button, Skeleton, Stack } from '@mui/material'

import axios from 'axios'

import { toast } from 'react-toastify'

import type { ThemeColor } from '@core/types'

// Component Imports
import type { Order } from '@/types/api/common/Order'
import { PaymentStatus } from '@/constants/PaymentStatus'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import { SubOrderCxt } from './context'

type PayementStatusType = {
  text: string
  color: ThemeColor
}

type StatusChipColorType = {
  color: ThemeColor
}

export const paymentStatus: { [key: number]: PayementStatusType } = {
  1: { text: 'Paid', color: 'success' },
  2: { text: 'Pending', color: 'warning' },
  3: { text: 'Cancelled', color: 'secondary' },
  4: { text: 'Failed', color: 'error' }
}

export const statusChipColor: { [key: string]: StatusChipColorType } = {
  Delivered: { color: 'success' },
  'Out for Delivery': { color: 'primary' },
  'Ready to Pickup': { color: 'info' },
  Dispatched: { color: 'warning' }
}

const OrderDetailHeader = () => {
  const { orderData: order, orderDataLoading } = useContext(SubOrderCxt)
  const key = order?.payment.toString() as '0' | '1' | '-1'
  const paymentStatus = PaymentStatus[key]

  const [statusBy, setStatusBy] = useState(order?.status_show?.by ?? '')
  const [statusName, seStatusName] = useState(order?.status_show?.name ?? '')

  //handle side effects
  useEffect(() => {
    setStatusBy(order?.status_show?.by ?? '')
    seStatusName(order?.status_show?.name ?? '')
  }, [order])

  // Methods
  const handleChangeStatus = async (id: number, key: string) => {
    const body = { status: key }
    const headers = await getClientAuthHeaders()

    // send request
    axios
      .post<{
        data: {
          by: string
          name: string
        }
      }>(api`dashboard/order/status/${id}`, body, { headers })
      .then(response => {
        setStatusBy(response.data?.data?.by)
        seStatusName(response.data?.data?.name)
        toast.success('Status Changed Successfully')
      })
      .catch(() => {})
  }

  if (orderDataLoading)
    return <Skeleton variant='rectangular' width={'100%'} height={'70px'} sx={{ borderRadius: '6px' }} />

  return (
    <div className='flex flex-wrap justify-between sm:items-center max-sm:flex-col gap-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <div className='flex items-center gap-2'>
          <Typography variant='h5'>{`Order #${order?.id}`}</Typography>
          <Chip variant='tonal' label={paymentStatus ?? ''} color={'success'} size='small' />
          <Chip
            variant='tonal'
            label={statusName}
            color={'primary'}
            size='small'
            disabled={statusBy !== 'admin'}
            onClick={() => {
              if (statusBy === 'admin') {
                handleChangeStatus(order?.main_order?.id ?? -1, order?.status_show?.key ?? '')
              }
            }}
          />
        </div>
        <Typography>{moment(order?.created_at).format('MMM Do YYYY, h:mm:ss A')}</Typography>
      </div>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={3}>
        <Button
          color='success'
          sx={{
            bgcolor: '#dcf6e8'
          }}
        >
          Start Chat
        </Button>
        <Button color='error' sx={{ bgcolor: '#f9dbdf' }}>
          Delete Order
        </Button>
      </Stack>
    </div>
  )
}

export default OrderDetailHeader
