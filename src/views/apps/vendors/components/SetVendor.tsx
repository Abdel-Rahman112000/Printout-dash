'use client'

import * as React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import type { TransitionProps } from '@mui/material/transitions'
import { Stack, TextField } from '@mui/material'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { toast } from 'react-toastify'

import { api } from '@/utils/api'
import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { VendorsCxt } from '../context'
import GoogleMapComponent from './LoactionMap'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function SetVendorDialog(props: PropsType) {
  // Vars and States
  const { open, setOpen } = props
  const { handleRefreshVendorsData } = React.useContext(VendorsCxt)
  const { register, handleSubmit } = useForm<SetVendorFormType>()
  const [marker, setMarker] = React.useState<{ lat: number; lng: number }>()

  const handleClose = () => {
    setOpen(false)
  }

  const handleOnSubmit = handleSubmit(async data => {
    const headers = await getClientAuthHeaders()

    axios
      .post(api`dashboard/vendors`, { ...data, latitude: marker?.lat, longitude: marker?.lng }, { headers })
      .then(() => {
        toast.success('Vendor added successfully')
        handleRefreshVendorsData()
        handleClose()
      })
      .catch(() => {
        toast.error('Fiald add vendor')
      })
      .finally(() => {})
  })

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>Add Vendor</DialogTitle>
        <DialogContent>
          <Stack spacing={3} component={'form'} onSubmit={handleOnSubmit}>
            <TextField size='small' {...register('name')} fullWidth id='name' label='vendor name' variant='outlined' />
            <TextField
              size='small'
              {...register('email')}
              fullWidth
              id='email'
              label='vendor email'
              variant='outlined'
            />
            <TextField
              size='small'
              {...register('password')}
              fullWidth
              id='password'
              label='vendor password'
              variant='outlined'
            />
            {/* map */}
            {/* <VendorLoactionMap markerPosition={addressPosition} setMarkerPosition={setAddressPosition} /> */}
            <GoogleMapComponent marker={marker} setMarker={setMarker} />
            <Button variant='contained' color='success' type='submit'>
              Save
            </Button>
            <Button variant='contained' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

type SetVendorFormType = {
  name: string
  email: string
  password: string
}

type PropsType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
