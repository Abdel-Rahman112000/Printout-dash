'use client'

// MUI
import { useContext } from 'react'

import { Box, Button, IconButton, Stack, Typography } from '@mui/material'

// Type
import ShareIcon from '@mui/icons-material/Share'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { CustimizedProductCxt } from '../../context'

export default function CustomizationDetailsCardHeader() {
  const { orderData } = useContext(CustimizedProductCxt)

  return (
    <Stack
      direction={{
        sx: 'column',
        md: 'row'
      }}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box>
        <Typography variant='h6' fontWeight={600} fontSize={18}>
          {orderData?.order?.product_name ?? '_'}
        </Typography>
        <Typography variant='body1'>
          Order By. <span style={{ color: '#000' }}>{orderData?.order?.main_order?.client?.user_name ?? '_'}</span>
        </Typography>
      </Box>

      <Stack
        direction={{
          sx: 'column',
          md: 'row'
        }}
        alignItems={'center'}
        justifyContent={'space-evenly'}
        spacing={4}
      >
        <Button
          color='success'
          sx={{
            my: 1,
            bgcolor: '#dcf6e8'
          }}
        >
          Make an offer
        </Button>
        <Button
          color='success'
          sx={{
            my: 1,
            bgcolor: '#dcf6e8'
          }}
        >
          Start Chat
        </Button>
        <Button
          color='success'
          sx={{
            my: 1,
            bgcolor: '#dcf6e8'
          }}
        >
          Download File
        </Button>

        <Stack direction={'row'} spacing={4}>
          <IconButton>
            <ShareIcon />
          </IconButton>

          <IconButton>
            <ContentCopyIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
