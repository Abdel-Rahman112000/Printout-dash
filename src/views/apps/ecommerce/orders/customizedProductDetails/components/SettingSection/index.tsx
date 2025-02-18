'use client'
// MUI
import { useContext } from 'react'

import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'

// Icons
import CheckIcon from '@mui/icons-material/Check'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'

import { CustimizedProductCxt } from '../../context'

export default function SettingSection() {
  const { orderData } = useContext(CustimizedProductCxt)

  return (
    <Box
      sx={{
        p: 4,
        my: 3
      }}
    >
      <Typography variant='body1' fontSize={18} fontWeight={700} color={'#000'}>
        Setting
      </Typography>
      <Stack spacing={3} direction={'row'} my={'8px'}>
        <Chip
          variant='filled'
          sx={{ borderRadius: '8px', border: '1px dotted gray', bgcolor: '#7BE2FF' }}
          label={`Pages ${orderData?.file ?? ''}`}
        />
        <Chip variant='filled' sx={{ borderRadius: '8px' }} label='Rest of pages' />
      </Stack>
      {/* Properities */}
      <Stack
        direction={{
          sx: 'column',
          md: 'row'
        }}
      >
        {/* loading */}
        {orderData === undefined ? <LoadingCase /> : <ProperitiesList />}
      </Stack>
    </Box>
  )
}

const ProperitiesList = () => {
  const { orderData } = useContext(CustimizedProductCxt)
  const color = orderData?.color ?? 'Original'
  const scalling = orderData?.scalling ?? '_'
  const paperType = orderData?.paper_type ?? '_'
  const quantity = orderData?.qty ?? '_'

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary={`Colors : ${color}`} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <PeopleAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Size : ${scalling}`} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <LanguageOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Paper type : ${paperType}`} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ContentCopyOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={`Copies : ${quantity}`} />
        </ListItemButton>
      </ListItem>
    </List>
  )
}

const LoadingCase = () => {
  return (
    <Stack>
      <Skeleton height={'25px'} width={'220px'} />
      <Skeleton height={'25px'} width={'220px'} />
      <Skeleton height={'25px'} width={'220px'} />
      <Skeleton height={'25px'} width={'220px'} />
    </Stack>
  )
}
