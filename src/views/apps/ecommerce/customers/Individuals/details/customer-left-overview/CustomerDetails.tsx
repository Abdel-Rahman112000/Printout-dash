'use client'

// MUI Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'

// Type Imports
import type { Customer } from '@/types/apps/ecommerceTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import EditUserInfo from '@components/dialogs/edit-user-info'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import EditCustomerDrawer from './EditCustomerDrawer'

const CustomerDetails = ({ customerData }: { customerData?: Customer }) => {
  // Vars
  const buttonProps: ButtonProps = {
    variant: 'contained',
    children: 'Edit Details'
  }

  const [customerUserOpen, setCustomerUserOpen] = useState(false)

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        <div className='flex flex-col justify-self-center items-center gap-6'>
          <div className='flex flex-col items-center gap-4'>
            <CustomAvatar
              src={customerData?.media?.[0]?.original_url}
              variant='rounded'
              alt='Customer Avatar'
              size={120}
            />
            <div className='flex flex-col items-center text-center'>
              <Typography variant='h5'>{customerData?.user_name}</Typography>
              <Typography>Customer ID #{customerData?.id}</Typography>
            </div>
          </div>
          <div className='flex items-center justify-around gap-4 flex-wrap is-full'>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' skin='light' color='primary'>
                <i className='tabler-shopping-cart' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>{customerData?.orders_count}</Typography>
                <Typography>Orders</Typography>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' skin='light' color='primary'>
                <i className='tabler-currency-dollar' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>${customerData?.orders_sum_total_price}</Typography>
                <Typography>Spent</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Typography variant='h5'>Details</Typography>
          <Divider />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-1'>
              <Typography color='text.primary' className='font-medium'>
                Username:{customerData?.user_name}
              </Typography>
            </div>
            <div className='flex items-center gap-1'>
              <Typography color='text.primary' className='font-medium'>
                Billing Email:
              </Typography>
              <Typography>{customerData?.email}</Typography>
            </div>
            <div className='flex items-center gap-1'>
              <Typography color='text.primary' className='font-medium'>
                Status:
              </Typography>
              <Chip
                label={
                  customerData?.is_active === -1 ? 'Not Active' : customerData?.is_active === 1 ? ' Active' : 'Unknown'
                }
                color={
                  customerData?.is_active === -1 ? 'warning' : customerData?.is_active === 1 ? 'success' : 'default'
                }
                variant='tonal'
                size='small'
              />{' '}
            </div>
            <div className='flex items-center gap-1'>
              <Typography color='text.primary' className='font-medium'>
                Contact:
              </Typography>
              <Typography>{customerData?.phone}</Typography>
            </div>
          </div>
        </div>
        {/* <OpenDialogOnElementClick element={Button} elementProps={buttonProps} dialog={EditUserInfo} /> */}
        <Button
          variant='contained'
          color='primary'
          className='max-sm:is-full'
          onClick={() => setCustomerUserOpen(!customerUserOpen)}
        >
          Edit Details
        </Button>
        <EditCustomerDrawer
          customerData={customerData}
          open={customerUserOpen}
          handleClose={() => setCustomerUserOpen(!customerUserOpen)}
          // setData={setData}
          // customerData={data}
        />
      </CardContent>
    </Card>
  )
}

export default CustomerDetails
