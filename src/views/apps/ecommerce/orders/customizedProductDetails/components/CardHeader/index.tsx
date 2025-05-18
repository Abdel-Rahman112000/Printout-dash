'use client'

// MUI
import { useContext, useState } from 'react'

import { Box, Button, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'

// Type
import ShareIcon from '@mui/icons-material/Share'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { CustimizedProductCxt } from '../../context'

const pdfFiles = [
  { name: 'Report 1', url: '/pdfs/report1.pdf' },
  { name: 'Report 2', url: '/pdfs/report2.pdf' },
  { name: 'Report 3', url: '/pdfs/report3.pdf' }
]

export default function CustomizationDetailsCardHeader() {
  const { orderData } = useContext(CustimizedProductCxt)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
        <Button color='success' onClick={handleClick} sx={{ my: 1, bgcolor: '#dcf6e8' }}>
          Download File
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {pdfFiles.map((file, index) => (
            <MenuItem
              key={index}
              component='a'
              href={file.url}
              target='_blank'
              rel='noopener noreferrer'
              onClick={handleClose}
            >
              {file.name}
            </MenuItem>
          ))}
        </Menu>

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
