'use client'

import { useContext } from 'react'

import { Box, Skeleton, Stack } from '@mui/material'

import { CustimizedProductCxt } from '../../context'

export default function ProductFileImages() {
  const { orderData } = useContext(CustimizedProductCxt)

  return (
    <Box>
      <Stack direction={'row'} spacing={3} overflow={'auto'} sx={{ my: 4 }}>
        {/* loading case */}
        {orderData === undefined && <LoadingCase />}
        {/* show images */}
        {/* {orderData?.pictures?.map(image => (
          <img
            key={image.id}
            src={image?.original_url ?? ''}
            width={'180px'}
            height={'200px'}
            alt={`image ${image.id}`}
          />
        ))} */}
        {/* No images */}
        {/* {orderData?.pictures?.length == 0 && (
          <Stack alignItems={'center'} justifyContent={'center'}>
            No media files
          </Stack>
        )} */}
      </Stack>
    </Box>
  )
}

const LoadingCase = () => (
  <>
    <Skeleton variant='rectangular' width={'180px'} height={'200px'} sx={{ borderRadius: '10px' }} />
    <Skeleton variant='rectangular' width={'180px'} height={'200px'} sx={{ borderRadius: '10px' }} />
    <Skeleton variant='rectangular' width={'180px'} height={'200px'} sx={{ borderRadius: '10px' }} />
    <Skeleton variant='rectangular' width={'180px'} height={'200px'} sx={{ borderRadius: '10px' }} />
  </>
)
