'use client'

// MUI Imports
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Stack } from '@mui/material'

// Utils & Libraries
import axios from 'axios'
import { toast } from 'react-toastify'

// Other Imports
import { api } from '@/utils/api'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import type { Customer } from '@/types/apps/ecommerceTypes'

const CustomerDetailHeader = ({ customerData, customerId }: { customerData?: Customer; customerId: string }) => {
  const [dialogType, setDialogType] = useState<'delete' | 'deactivate' | null>(null)
  const router = useRouter()

  const handleClose = () => setDialogType(null)

  const handleDeleteCustomer = async () => {
    try {
      const headers = await getClientAuthHeaders()

      await axios.delete(api`dashboard/clients/${customerId}`, { headers })
      toast.success('Client deleted successfully!')
      router.push('/apps/ecommerce/customers/Individuals/list')
    } catch (error) {
      toast.error('Unexpected error')
    }
  }

  const handleDeactivateCustomer = async () => {
    try {
      const headers = await getClientAuthHeaders()

      await axios.post(api`dashboard/clients/${customerId}/activate`, { status: 1 }, { headers })
      toast.success('Client deactivated successfully!')
      router.push('/apps/ecommerce/customers/Individuals/list')
    } catch (error) {
      toast.error('Unexpected error')
    }
  }

  return (
    <div className='flex flex-wrap justify-between max-sm:flex-col sm:items-center gap-x-6 gap-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <Typography variant='h4'>{`Customer ID #${customerId}`}</Typography>
        <Typography>
          {customerData?.created_at ? new Date(customerData.created_at).toDateString() : 'Date not available'}
        </Typography>
      </div>

      <Stack direction='row' spacing={2}>
        <Button color='error' variant='tonal' onClick={() => setDialogType('deactivate')}>
          Deactivate Customer
        </Button>
        <Button color='error' variant='tonal' onClick={() => setDialogType('delete')}>
          Delete Customer
        </Button>
      </Stack>

      <Dialog open={dialogType !== null} onClose={handleClose}>
        <DialogTitle>{dialogType === 'delete' ? 'Delete Customer' : 'Deactivate Customer'}</DialogTitle>
        <DialogContent>
          {dialogType === 'delete'
            ? 'Are you sure you want to delete this customer? This action cannot be undone.'
            : 'Are you sure you want to deactivate this customer? This action cannot be undone.'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={dialogType === 'delete' ? handleDeleteCustomer : handleDeactivateCustomer} color='error'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CustomerDetailHeader
