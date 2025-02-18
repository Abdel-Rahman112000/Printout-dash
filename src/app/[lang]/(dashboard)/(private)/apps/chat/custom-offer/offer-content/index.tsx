'use client'
import Link from 'next/link'

import { Box, Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { FilePond } from 'react-filepond'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<OfferSchemaType>({
    resolver: zodResolver(OfferSchema)
  })

  console.log(errors)

  const onSubmit = handleSubmit(async data => {
    console.log(data)
  })

  return (
    <>
      {/* offer content */}

      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box sx={{ width: { md: '65%', xs: '100%' } }}>
          <Typography variant='h4'>Make an offer</Typography>
          <Typography variant='body1'>Make an offer if it’</Typography>
        </Box>
        <Box
          sx={{
            width: { md: '35%', xs: '100%' },
            display: 'flex',
            justifyContent: 'space-evenly'
          }}
        >
          <Button variant='contained' color='secondary'>
            Discard
          </Button>
          <Button variant='outlined' color='primary'>
            Save Draft
          </Button>
          <Button variant='contained' color='primary' onClick={onSubmit}>
            Send Offer
          </Button>
        </Box>
      </Stack>
      {/* offer content */}
      <Grid container sx={{ mt: 4 }} spacing={6}>
        <Grid item xs={8}>
          <Box sx={{ backgroundColor: '#fff', p: 4 }}>
            <Typography variant='body1' sx={{ my: 5 }}>
              Offer info
            </Typography>
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
              <Grid item xs={6}>
                <TextField {...register('height')} fullWidth size='small' label='Height' />
              </Grid>
              <Grid item xs={6}>
                <TextField {...register('width')} fullWidth size='small' label='Width' />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('description')}
                  multiline
                  minRows={4}
                  fullWidth
                  size='small'
                  label='Description'
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
          {/* <Box sx={{ backgroundColor: '#fff', p: 4, mt: 5 }}>
            <Typography variant='body1' sx={{ my: 5 }}>
              Paper Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField select fullWidth size='small' label='Paper Type'>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField select fullWidth size='small' label='Finishing'>
                  <MenuItem>Ten</MenuItem>
                  <MenuItem>Twenty</MenuItem>
                  <MenuItem>Thirty</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box> */}
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
                <TextField {...register('price')} fullWidth size='small' label='Base Price' />
                <Typography color='error'>{errors.price?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('discounted')} fullWidth size='small' label='Discounted Price' />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ContentOffer
