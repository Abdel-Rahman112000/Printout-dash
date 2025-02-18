'use client'

import { useContext } from 'react'

import { Box, Skeleton, Typography } from '@mui/material'

import { CustimizedProductCxt } from '../../context'

export default function CustomizationDetailsNotes() {
  const { orderData } = useContext(CustimizedProductCxt)

  return (
    <Box>
      <Typography variant='body1' fontSize={20} fontWeight={700}>
        Notes
      </Typography>
      <Typography variant='body2'>
        {orderData === undefined ? (
          <Skeleton variant='rectangular' height={'30px'} sx={{ borderRadius: '7px' }} />
        ) : (
          (orderData?.order?.note ?? '_')
        )}
      </Typography>
    </Box>
  )
}
