'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { FilePond } from 'react-filepond'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { toast } from 'react-toastify'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { api } from '@/utils/api'
import type { AllOptionsType } from '@/types/apps/allOptionsType'
import type { PaperType } from '@/types/api/common/PaperType'
import type { Product } from '@/types/api/common/Product'
import { OfferSchema, type OfferSchemaType } from './OfferSchema'
import OrderCart from './OrderCart'
import type { OrderCartType } from '@/types/api/common/OrderCart'

function ContentOffer() {
  const [searchClient, setSearchClient] = useState('')
  const [allOptions, setAllOptions] = useState<AllOptionsType>()
  const [allOrders, setAllOrders] = useState<OrderCartType[]>([])
  const [paperData, setPaperData] = useState<PaperType>()
  const [productInfo, setProductInfo] = useState<Product>()

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset
  } = useForm<OfferSchemaType>({
    resolver: zodResolver(OfferSchema)
  })

  console.log('errors', errors)
  const { type_id, category_id, paper_id, product_id, client_id } = watch()
  const paperInfo = paperData?.size.find(index => index.id.toString() == paper_id)

  const getProductInfo = async () => {
    const headers = await getClientAuthHeaders()

    axios
      .get<{ data: Product }>(api`dashboard/product/${product_id}`, {
        headers
      })
      .then(res => {
        console.log(res.data.data)
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

  const getOrderCart = async () => {
    const headers = await getClientAuthHeaders()

    axios
      .get<{ data: OrderCartType[] }>(api`dashboard/order/user-cart/${client_id}`, {
        headers
      })
      .then(res => {
        setAllOrders(res.data.data)
      })
      .catch(() => {
        // toast.error('Error in delete vendor')
      })
  }

  useEffect(() => {
    getOrderCart()
  }, [client_id])

  useEffect(() => {
    getAllOptions()
  }, [searchClient, type_id, category_id])

  useEffect(() => {
    getPaperSize()
  }, [])

  useEffect(() => {
    if (product_id) getProductInfo()
  }, [product_id])

  useEffect(() => {
    setProductInfo(undefined)
  }, [type_id, category_id])

  useEffect(() => {
    if (paperInfo) {
      // Set the values after fetching paperInfo
      setValue('height', paperInfo?.size?.height)
      setValue('width', paperInfo?.size?.width)
    } else {
      setValue('paper_id', '')
    }
  }, [paperInfo, setValue])

  const onSubmit = handleSubmit(async data => {
    const headers = await getClientAuthHeaders()

    const payload = {
      note: data.note,
      type_id: data.type_id,
      client_id: data.client_id,
      order_details: [
        {
          product_id: data.product_id,
          qty: data.qty,
          file: data.file,
          height: data.height,
          paper_id: data.paper_id,
          width: data.width,
          CustomizationChoices: data.CustomizationChoices || []
        }
      ]
    }

    axios
      .post(api`dashboard/order`, payload, {
        headers
      })
      .then(res => {
        toast.success('success')
        getOrderCart()
        reset({
          name: '',
          type_id: data.type_id,
          client_id: data.client_id,
          category_id: '',
          product_id: '',
          paper_id: '',
          note: '',
          processing_days: '',
          discounted_price: '',
          qty: ''
        })
      })
      .catch(err => {
        console.log('error order', err)
        toast.error('error')
      })
  })

  return (
    <>
      {/* offer content */}

      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box sx={{ width: { md: '60%', xs: '100%' } }}>
          <Typography variant='h4'>Make an offer</Typography>
          <Typography variant='body1'>Make an offer if it’</Typography>
        </Box>
        <Box
          sx={{
            width: { md: '40%', xs: '100%' },
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} color='secondary'>
            Add as order
          </Button>
          <Button variant='outlined' sx={{ mr: 2 }} color='primary'>
            Discard
          </Button>
          <Button variant='contained' sx={{ mr: 2 }} color='primary'>
            Notify User
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
                  options={allOptions?.clients?.data || []}
                  onInputChange={(event, newInputValue) => {
                    setSearchClient(newInputValue)
                  }}
                  getOptionLabel={option => `${option.user_name}`}
                  filterOptions={(options, { inputValue }) =>
                    options.filter(
                      option =>
                        option.user_name.toLowerCase().includes(inputValue.toLowerCase()) ||
                        option.phone.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setValue('client_id', newValue.id.toString())
                    }
                  }}
                  renderInput={params => <TextField {...params} label='Clients' />}
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
                        <MenuItem key={type.id} value={type.id.toString()}>
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
                        <MenuItem key={cat.id} value={cat.id.toString()}>
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
                        <MenuItem key={product.id} value={product.id.toString()}>
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
          {productInfo?.customizations?.length ? (
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
                          <MenuItem key={paper.id} value={paper.id.toString()}>
                            {paper.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                  <Typography color='error'>{errors.paper_id?.message}</Typography>
                </Grid>
                {productInfo?.customizations?.map((custom, index) => (
                  <Grid key={custom.id} item xs={6}>
                    <Controller
                      control={control}
                      name={`CustomizationChoices.${index}`}
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
                ))}

                <Grid item xs={6}>
                  <TextField
                    {...register('height')}
                    label='Height'
                    disabled
                    value={paperInfo ? paperInfo?.size?.height : ''}
                    fullWidth
                    size='small'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Width'
                    {...register('width')}
                    disabled
                    value={paperInfo ? paperInfo?.size?.width : ''}
                    fullWidth
                    size='small'
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
                  <TextField
                    {...register('note')}
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
          )}

          {/* Upload Image */}
          {type_id != '2' && (
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
          )}

          {/* Add Product */}
          <Button variant='contained' sx={{ mt: 6 }} onClick={onSubmit}>
            Add Product
          </Button>
        </Grid>

        {/* Fourth Form */}
        <Grid item xs={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ backgroundColor: '#fff', p: 4 }}>
                <Typography variant='body1' sx={{ my: 5 }}>
                  Pricing
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField {...register('qty')} fullWidth size='small' label='Quantity' />
                    <Typography color='error'>{errors.qty?.message}</Typography>
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
            <Grid item xs={12}>
              <Box sx={{ backgroundColor: '#fff', p: 4 }}>
                <OrderCart allOrders={allOrders} getOrderCart={getOrderCart} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ContentOffer
