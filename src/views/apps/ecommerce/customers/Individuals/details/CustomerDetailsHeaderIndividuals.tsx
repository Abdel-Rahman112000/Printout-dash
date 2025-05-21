// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { ButtonProps } from '@mui/material/Button'

// Type Imports
import { Stack } from '@mui/material'

import type { ThemeColor } from '@core/types'

// Component Imports
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import type { Customer } from '@/types/apps/ecommerceTypes'

const CustomerDetailHeaderIndividuals = ({
  customerData,
  customerId
}: {
  customerData?: Customer
  customerId: string
}) => {
  // Vars
  const buttonProps = (children: string, color: ThemeColor, variant: ButtonProps['variant']): ButtonProps => ({
    children,
    color,
    variant
  })

  return (
    <div className='flex flex-wrap justify-between max-sm:flex-col sm:items-center gap-x-6 gap-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <Typography variant='h4'>{`Customer ID #${customerId}`}</Typography>
        {customerData?.created_at ? new Date(customerData.created_at).toDateString() : 'No Date'}
      </div>
      <Stack direction='row' spacing={2}>
        <OpenDialogOnElementClick
          element={Button}
          elementProps={buttonProps('Deactivate', 'error', 'tonal')}
          dialog={ConfirmationDialog}
          dialogProps={{ type: 'delete-customer' }}
        />
        <OpenDialogOnElementClick
          element={Button}
          elementProps={buttonProps('Delete Customers', 'error', 'tonal')}
          dialog={ConfirmationDialog}
          dialogProps={{ type: 'delete-customer' }}
        />
      </Stack>
    </div>
  )
}

export default CustomerDetailHeaderIndividuals
