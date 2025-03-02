'use client'

import React, { useCallback, useContext, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import type { GridProps } from '@mui/material'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material'

import { FilePond } from 'react-filepond'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import axios, { AxiosError } from 'axios'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { serialize } from 'object-to-formdata'

import classNames from 'classnames'

import LoadingButton from '@mui/lab/LoadingButton'

import { getStatusMessage } from 'http-status-message'

import { useSnackbar } from 'notistack'

import { toast } from 'react-toastify'

import AddLabelToEl from '@/components/AddLabelToEl'
import { api } from '@/utils/api'
import CustomInputVertical from '@/@core/components/custom-inputs/Vertical'
import type { CustomInputVerticalData } from '@/@core/components/custom-inputs/types'
import type { Category, Product } from '@/types/api/common/Product'
import { getClientAuthSession } from '@/utils/headers/authClient'
import { ProductContext } from '../../context'
import { numberStringSchema } from '@/utils/validation/zod/numberStringSchema'
import { addPricingToProduct } from '@/utils/api/products/addPricingToProduct'

const GridItem = (props: GridProps) => <Grid xs={12} md={6} item {...props} />

const priceConditionSchema = z.object({
  price: numberStringSchema,
  moreThan: numberStringSchema
})

const schema = z.object({
  price: numberStringSchema,
  priceConditions: z.array(priceConditionSchema).optional().nullable()
})

type SchemaType = z.infer<typeof schema>

function ProductPricingForm({ handleNext }: Props) {
  const {
    query: { data: product, refetch },
    productId
  } = useContext(ProductContext)

  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  // Form
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    control
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: product?.product_price
      ? {
          price: `${product.product_price?.price}`,
          priceConditions: product.product_price?.product_price_condition?.map(({ price, condition_answer }) => ({
            moreThan: `${condition_answer}`,
            price: `${price}`
          }))
        }
      : undefined
  })

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'priceConditions'
  })

  const onSubmit = handleSubmit(async data => {
    try {
      if (!productId) return
      const headers = await getClientAuthSession()

      const res = await addPricingToProduct(
        {
          price: data.price,
          product_id: productId,
          conditions:
            data.priceConditions?.map(({ moreThan, price }) => ({
              price,
              condition_answer: moreThan,
              condition: 'more than'
            })) || []
        },
        headers
      )

      refetch()
      productId ? toast.success('Product Edit successfully') : toast.success('Product added successfully')
      router.push(`/en/apps/ecommerce/products/list`)
      handleNext()
    } catch (error: any) {
      enqueueSnackbar(getStatusMessage(error.status, 'funny'))
    }
  })

  return (
    <Box component={'form'} noValidate onSubmit={onSubmit}>
      <Button variant='contained' onClick={() => append({ moreThan: '0', price: '0' })} fullWidth>
        Add New Customization
      </Button>
      <Grid container spacing={6}>
        <GridItem>
          <AddLabelToEl label='Price / Piece (Main Price)' error={errors.price?.message}>
            <TextField placeholder='100' {...register('price')} />
          </AddLabelToEl>
        </GridItem>
        <Grid item xs={12}>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className='flex gap-1 py-2'>
                <div>
                  <IconButton
                    onClick={() => {
                      remove(index)
                    }}
                    color='error'
                  >
                    <RemoveCircleIcon fontSize='large' />
                  </IconButton>
                </div>
                <Grid container spacing={6}>
                  <GridItem>
                    <AddLabelToEl label='Price / Piece' error={errors.priceConditions?.[index]?.price?.message}>
                      <TextField placeholder='Name' type='number' {...register(`priceConditions.${index}.price`)} />
                    </AddLabelToEl>
                  </GridItem>
                  <GridItem>
                    <AddLabelToEl label='Condition' error={errors.priceConditions?.[index]?.moreThan?.message}>
                      <TextField
                        placeholder='Name'
                        type='number'
                        InputProps={{ startAdornment: <InputAdornment position='start'>More Than</InputAdornment> }}
                        {...register(`priceConditions.${index}.moreThan`)}
                      />
                    </AddLabelToEl>
                  </GridItem>
                </Grid>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
      <LoadingButton loading={isSubmitting} type='submit' variant='contained' fullWidth>
        Submit
      </LoadingButton>
    </Box>
  )
}

type Props = {
  handleNext: () => void
}
export default ProductPricingForm
