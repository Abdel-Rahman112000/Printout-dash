'use client'

import { useCallback, useContext, useEffect } from 'react'

import type { GridProps } from '@mui/material'
import { Box, Button, Divider, Grid, MenuItem, Stack, TextField } from '@mui/material'

import { FilePond } from 'react-filepond'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import axios from 'axios'

import { serialize } from 'object-to-formdata'

import classNames from 'classnames'

import LoadingButton from '@mui/lab/LoadingButton'

import { useSnackbar } from 'notistack'

import { getStatusMessage } from 'http-status-message'

import AddLabelToEl from '@/components/AddLabelToEl'
import { api } from '@/utils/api'
import CustomInputVertical from '@/@core/components/custom-inputs/Vertical'
import { getClientAuthSession } from '@/utils/headers/authClient'
import CustomizationItem from './CustomizationItem'
import type { addCustomizationsToProductDTO } from '@/utils/api/products/addCustomizationsToProduct'
import { addCustomizationsToProduct } from '@/utils/api/products/addCustomizationsToProduct'
import { $CustomizationType } from '@/types/api/common/Product'
import { numberStringSchema } from '@/utils/validation/zod/numberStringSchema'
import { ProductContext } from '../../context'

const GridItem = (props: GridProps) => <Grid xs={12} md={6} item {...props} />

const singleCustomizationOptionChoice = z.object({
  name: z.string().min(1),
  type: z.string().optional(),
  price: numberStringSchema.optional()
})

const singleCustomizationOption = z.object({
  name: z.string().min(1),
  type_id: z.nativeEnum($CustomizationType),
  choices: z.array(singleCustomizationOptionChoice).min(1)
})
// .refine(
//   ({ choices, type_id }) => {
//     switch (type_id) {
//       case $CustomizationType.ONE:
//         if (choices.length !== 1) {
//           return false
//         }

//       case $CustomizationType.DOUBLE:
//         if (choices.length !== 2) {
//           return false
//         }
//     }

//     return true
//   },
//   {
//     message: 'The count of choices doesnot match the type selected',
//     path: ['type_id']
//   }
// )

const schema = z.object({
  customizations: z.array(singleCustomizationOption)
})

export type SchemaType = z.infer<typeof schema>

function ProductCustomizationForm({ handleNext }: Props) {
  const {
    query: { data: product, refetch },
    productId
  } = useContext(ProductContext)

  // Form
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      customizations:
        product?.customizations?.map(({ name, choices, customizations_type }) => ({
          type_id: customizations_type as $CustomizationType,
          name,
          choices:
            choices?.map(({ price, name, type }) => {
              return {
                price: `${price}`,
                type,
                name
              }
            }) || []
        })) || []
    }
  })

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
    setValue
  } = form

  const { enqueueSnackbar } = useSnackbar()

  const { fields, append, remove } = useFieldArray({ control, name: 'customizations' })

  console.log(errors)

  const onSubmit = useCallback(
    handleSubmit(async data => {
      console.log(data)

      if (!product?.id) return

      const dto: addCustomizationsToProductDTO = {
        customizations: data.customizations.map(customization => {
          return {
            product_id: `${product?.id}`,
            choices: customization.choices.map(({ name, price, type }) => ({ name, price, type })),
            customizations_type: customization.type_id,
            name: customization.name
          }
        })
      }

      try {
        const headers = await getClientAuthSession()
        const res = await addCustomizationsToProduct(dto, headers)

        handleNext()
        refetch()
      } catch (error: any) {
        enqueueSnackbar(getStatusMessage(error.status, 'funny'))
      }
    }),
    []
  )

  return (
    <Stack spacing={3} component={'form'} noValidate onSubmit={onSubmit}>
      <Button
        variant='contained'
        onClick={() => append({ choices: [], name: '', type_id: $CustomizationType.MORE })}
        fullWidth
      >
        Add New Customization
      </Button>
      <div>
        {fields.map((field, index) => (
          <CustomizationItem key={field.id} remove={remove} field={field} form={form} index={index} />
        ))}
      </div>
      <div className='flex gap-2'>
        <LoadingButton loading={isSubmitting} type='submit' variant='contained' sx={{ flexGrow: 1 }}>
          Submit
        </LoadingButton>
        <Button variant='outlined' onClick={() => handleNext()}>
          Skip Customizations
        </Button>
      </div>
    </Stack>
  )
}

type Props = {
  handleNext: () => void
}
export default ProductCustomizationForm
