'use client'
import { useContext } from 'react'

import { Avatar, Box, Stack, Typography } from '@mui/material'

import { CustimizedProductCxt } from '../../context'

export default function CustomizationProductDetailsUser() {
  const { orderData } = useContext(CustimizedProductCxt)

  return (
    <Box>
      <Typography variant='body1' fontSize={18} fontWeight={600}>
        User
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={4}>
        <Avatar>U</Avatar>
        <Box>
          <Typography variant='body1' fontSize={16} color={'#000'}>
            {orderData?.order?.main_order?.client?.user_name ?? '_'}
          </Typography>
          <Typography variant='body2'>4.4 / 5</Typography>
        </Box>
      </Stack>
    </Box>
  )
}
