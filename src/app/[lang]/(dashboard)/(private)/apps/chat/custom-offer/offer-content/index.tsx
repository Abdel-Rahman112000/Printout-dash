'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { FilePond } from 'react-filepond'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { AllOptionsType } from '@/types/apps/allOptionsType'
import type { PaperType } from '@/types/api/common/PaperType'
import type { Product } from '@/types/api/common/Product'

export const OfferSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  client_id: z.string().min(1, 'client_id is required'),
  type_id: z.number().min(1, 'type_id is required'),
  category_id: z.number(),
  product_id: z.number().min(1, 'product_id is required'),
  paper_id: z.number().min(1, 'product_id is required'),
  note: z.string().optional(),
  file: z.array(z.instanceof(File)).optional(),
  description: z.string().optional(),
  quantity: z.string().min(1, 'quantity is required'),
  processing_days: z.string().min(1, 'processing_days is required'),
  discounted_price: z.string().min(1, 'discounted_price is required')
})

export type OfferSchemaType = z.infer<typeof OfferSchema>

function ContentOffer() {
  const [searchClient, setSearchClient] = useState('')
  const [allOptions, setAllOptions] = useState<AllOptionsType>()
  const [paperData, setPaperData] = useState<PaperType>()
  const [productInfo, setProductInfo] = useState<Product>()

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<OfferSchemaType>({
    resolver: zodResolver(OfferSchema)
  })

  const { type_id, category_id, paper_id, product_id } = watch()
  const paperInfo = paperData?.size.find(index => index.id == paper_id)

  const getProductInfo = async () => {
    const headers = await getClientAuthHeaders()

    axios
      .get<{ data: Product }>(api`dashboard/product/${product_id}`, {
        headers
      })
      .then(res => {
        setProductInfo(res.data.data)
      })
      .catch(() => {
        // toast.error('Error in delete vendor')
      })
  }

  const getPaperSize = async () => {
    const headers = await getClientAuthHeaders()

    axios
      .get<{ data: PaperType }>(api`dashboard/paper`, {
        headers
      })
      .then(res => {
        setPaperData(res.data.data)
      })
      .catch(() => {
        // toast.error('Error in delete vendor')
      })
  }

  const getAllOptions = async () => {
    const headers = await getClientAuthHeaders()

    axios
      .get<{ data: AllOptionsType }>(api`dashboard/order/lookups`, {
        headers,
        params: { search_client: searchClient, type_id: type_id, category_id: category_id }
      })
      .then(res => {
        setAllOptions(res.data.data)
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
  }, [searchClient, type_id, category_id])
  useEffect(() => {
    getPaperSize()
  }, [])
  useEffect(() => {
    if (product_id) getProductInfo()
  }, [product_id])

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
          {/* First Form */}
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
                  options={allOptions?.clients.data || []}
                  inputValue={searchClient}
                  onInputChange={(event, newInputValue) => {
                    setSearchClient(newInputValue)
                  }}
                  getOptionLabel={option => `${option.user_name}`}
                  renderInput={params => <TextField {...register('client_id')} {...params} label='Clients' />}
                />
                <Typography color='error'>{errors.client_id?.message}</Typography>
              </Grid>
            </Grid>
          </Box>
          {/* Second Form */}
          <Box sx={{ backgroundColor: '#fff', p: 4, mt: 5 }}>
            <Typography variant='body1' sx={{ my: 5 }}>
              Order type
            </Typography>
            <Grid container spacing={3}>
              {/* Types */}
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name='type_id'
                  render={({ field }) => (
                    <TextField {...field} size='small' label='Types' select fullWidth>
                      {allOptions?.types?.map(type => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Typography color='error'>{errors.type_id?.message}</Typography>
              </Grid>
              {/* Category */}
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name='category_id'
                  render={({ field }) => (
                    <TextField {...field} size='small' label='Categories' select fullWidth disabled={!type_id}>
                      {allOptions?.categories.data?.map(cat => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Typography color='error'>{errors.category_id?.message}</Typography>
              </Grid>
              {/* Products */}
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name='product_id'
                  render={({ field }) => (
                    <TextField {...field} size='small' label='Products' select fullWidth disabled={!category_id}>
                      {allOptions?.products.data?.map(product => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Typography color='error'>{errors.product_id?.message}</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Third Form*/}
          {type_id == 1 ? (
            <Box sx={{ backgroundColor: '#fff', p: 4, mt: 5 }}>
              <Typography variant='body1' sx={{ my: 5 }}>
                Customize
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name='paper_id'
                    render={({ field }) => (
                      <TextField {...field} size='small' label='Paper' select fullWidth>
                        {paperData?.size?.map(paper => (
                          <MenuItem key={paper.id} value={paper.id}>
                            {paper.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                  <Typography color='error'>{errors.paper_id?.message}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField label='Height' disabled value={paperInfo?.size.height || ''} fullWidth size='small' />
                </Grid>
                <Grid item xs={6}>
                  <TextField label='Width' disabled value={paperInfo?.size.width || ''} fullWidth size='small' />
                </Grid>
                <Grid item xs={6}>
                  <TextField label='Bleed' disabled value={paperInfo?.size.width || ''} fullWidth size='small' />
                </Grid>
                {/* {productInfo?.customizations?.map((custom, index) => (
                  <Grid key={custom.id} item xs={6}>
                    <Controller
                      control={control}
                      name={custom.choices[index].name.toString()}
                      render={({ field }) => (
                        <TextField {...field} size='small' label={custom.name} select fullWidth>
                          {custom?.choices?.map(item => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                ))} */}

                <Grid item xs={12}>
                  <TextField
                    name='note'
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
          ) : (
            <Box sx={{ backgroundColor: '#fff', p: 4, mt: 5 }}>
              <Typography variant='body1' sx={{ my: 5 }}>
                Customize
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth size='small' label='Note' placeholder='Write a note' multiline rows={6} />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Upload Image */}
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

          {/* Add Product */}
          <Button variant='contained' sx={{ mt: 6 }}>
            Add Product
          </Button>
        </Grid>

        {/* Fourth Form */}
        <Grid item xs={4}>
          <Box sx={{ backgroundColor: '#fff', p: 4 }}>
            <Typography variant='body1' sx={{ my: 5 }}>
              Pricing
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField {...register('quantity')} fullWidth size='small' label='Quantity' />
                <Typography color='error'>{errors.quantity?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('processing_days')} fullWidth size='small' label='Processing Days' />
                <Typography color='error'>{errors.processing_days?.message}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={productInfo?.product_price?.price || ''}
                  disabled
                  fullWidth
                  size='small'
                  label='Base Price'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField {...register('discounted_price')} fullWidth size='small' label='Discounted Price' />
                <Typography color='error'>{errors.discounted_price?.message}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ContentOffer
