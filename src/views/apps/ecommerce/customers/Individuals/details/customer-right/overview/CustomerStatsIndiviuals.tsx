// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import StarBorderIcon from '@mui/icons-material/StarBorder'

// Type Imports
import { Stack } from '@mui/material'

import type { CardStatsCustomerStatsProps } from '@/types/pages/widgetTypes'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import type { Customer } from '@/types/apps/ecommerceTypes'

const CustomerStatsIndiviuals = ({ customerData }: { customerData: Customer }) => {
  // Props

  // console.log(customerData, 'customerDatacustomerDatacustomerDatacustomerDatacustomerData')

  return (
    <Stack direction='row' spacing={2} className='w-full'>
      <Card className='flex-1'>
        <CardContent className='flex flex-col gap-2'>
          <CustomAvatar variant='rounded' skin='light'>
            <StarBorderIcon />
          </CustomAvatar>
          <Typography variant='h5' className='capitalize'>
            Wishlist
          </Typography>

          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-1'>
              <Typography variant='h5'>{customerData.favorites_count}</Typography>
              <Typography>Items in wishlist</Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='flex-1'>
        <CardContent className='flex flex-col gap-2'>
          <CustomAvatar variant='rounded' skin='light'>
            <StarBorderIcon />
          </CustomAvatar>
          <Typography variant='h5' className='capitalize'>
            Cart
          </Typography>

          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-1'>
              <Typography variant='h5'>{customerData.carts_count}</Typography>
              <Typography>Items in Cart</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default CustomerStatsIndiviuals
