'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { FilePond } from 'react-filepond'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import axios from 'axios'

import { convertLength } from '@mui/material/styles/cssUtils'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { Client } from '@/types/api/common/User'

export const OfferSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.string().min(1, 'Price is required'),
  height: z.string().optional(),
  width: z.string().optional(),
  description: z.string().optional(),
  quantity: z.string().optional(),
  discounted: z.string().optional(),
  file: z.array(z.instanceof(File)).min(1)
})

export type OfferSchemaType = z.infer<typeof OfferSchema>

function ContentOffer() {
  const [searchClient, setSearchClient] = useState('')
  const [clients, setClients] = useState<Client[]>([])

  const top100Films = [
    { name: 'The Shawshank Redemption', id: 1994 },
    { name: 'The Godfather', id: 1972 },
    { name: 'The Godfather: Part II', id: 1974 },
    { name: 'The Dark Knight', id: 2008 }
  ]

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OfferSchemaType>({
    resolver: zodResolver(OfferSchema)
  })

  const getAllOptions = async () => {
    const headers = await getClientAuthHeaders()

    axios
      .get<{ data: Client[] }>(api`dashboard/clients`, { headers, params: { search_client: searchClient } })
      .then(res => {
        setClients(res.data.data)
      })
      .catch(() => {
        // toast.error('Error in delete vendor')
      })
  }

  const onSubmit = handleSubmit(async data => {
    console.log(data)
  })

  useEffect(() => {
    getAllOptions()
  }, [searchClient])

  return (
    <>
      {/* offer content */}

      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box sx={{ width: { md: '70%', xs: '100%' } }}>
          <Typography variant='h4'>Make an offer</Typography>
          <Typography variant='body1'>Make an offer if it’</Typography>
        </Box>
        <Box
          sx={{
            width: { md: '30%', xs: '100%' },
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} color='secondary'>
            Discard
          </Button>
          <Button variant='outlined' sx={{ mr: 2 }} color='primary'>
            Save Draft
          </Button>
          <Button variant='contained' sx={{ mr: 2 }} color='primary' onClick={onSubmit}>
            Send Offer
          </Button>
        </Box>
      </Stack>
      {/* offer content */}
      <Grid container sx={{ mt: 4 }} spacing={6}>
        <Grid item xs={8}>
          <Box sx={{ backgroundColor: '#fff', p: 4 }}>
            <Typography variant='body1' sx={{ my: 5 }}></Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  {...register('name')}
                  fullWidth
                  size='small'
                  label='Name'
                  placeholder='Business Card Printing'
                />
                <Typography color='error'>{errors.name?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  size='small'
                  fullWidth
                  disablePortal
                  options={clients}
                  inputValue={searchClient}
                  onInputChange={(event, newInputValue) => {
                    setSearchClient(newInputValue)
                  }}
                  getOptionLabel={option => `${option.user_name}`}
                  renderInput={params => <TextField {...params} label='Clients' />}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ backgroundColor: '#fff', p: 4, mt: 5 }}>
            <Typography variant='body1' sx={{ my: 5 }}>
              Order type
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField select fullWidth size='small' label='Type'>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField select fullWidth size='small' label='Category'>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField select fullWidth size='small' label='Product '>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ backgroundColor: '#fff', p: 4, mt: 5 }}>
            <Typography variant='body1' sx={{ my: 5 }}>
              Customize
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField select fullWidth size='small' label='Paper Size'>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField select fullWidth size='small' label='Customization 1'>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField select fullWidth size='small' label='Customization 2 '>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField select fullWidth size='small' label='Customization 3 '>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...register('name')}
                  fullWidth
                  size='small'
                  label='Height'
                  placeholder='Business Card Printing'
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...register('name')}
                  fullWidth
                  size='small'
                  label='Width'
                  placeholder='Business Card Printing'
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...register('name')}
                  fullWidth
                  size='small'
                  label='Bleed'
                  placeholder='Business Card Printing'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('name')}
                  fullWidth
                  size='small'
                  label='Note'
                  placeholder='Write a note'
                  multiline
                  rows={6}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ backgroundColor: '#fff', p: 4, mt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 4 }}>
              <Typography variant='body1'>Product Preview Image</Typography>
              <Link href={''}>Add media from URL</Link>
            </Box>

            <Controller
              name='file'
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FilePond
                    files={field.value}
                    onupdatefiles={files => {
                      field.onChange(files.map(filepondFile => filepondFile.file))
                    }}
                    allowMultiple={true}
                  />
                  <Typography color='error'>{fieldState.error?.message}</Typography>
                </>
              )}
            />
          </Box>
          <Button variant='contained' sx={{ mt: 6 }}>
            Add Product
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ backgroundColor: '#fff', p: 4 }}>
            <Typography variant='body1' sx={{ my: 5 }}>
              Pricing
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField {...register('quantity')} fullWidth size='small' label='Quantity' />
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('price')} fullWidth size='small' label='Processing Days' />
                <Typography color='error'>{errors.price?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('price')} fullWidth size='small' label='Base Price' />
                <Typography color='error'>{errors.price?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('price')} fullWidth size='small' label='Discounted Price' />
                <Typography color='error'>{errors.price?.message}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ContentOffer
