'use client'

import { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import type { GridProps } from '@mui/material'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { FilePond } from 'react-filepond'

import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import axios from 'axios'

import { serialize } from 'object-to-formdata'

import classNames from 'classnames'

import LoadingButton from '@mui/lab/LoadingButton'

import { useSnackbar } from 'notistack'

import { getStatusMessage } from 'http-status-message'

import { toast } from 'react-toastify'

import AddLabelToEl from '@/components/AddLabelToEl'
import { api } from '@/utils/api'
import CustomInputVertical from '@/@core/components/custom-inputs/Vertical'
import type { CustomInputVerticalData } from '@/@core/components/custom-inputs/types'
import type { Category, Product } from '@/types/api/common/Product'
import { getClientAuthHeaders, getClientAuthSession } from '@/utils/headers/authClient'
import { ProductContext } from '../../context'
import type { User } from '@/types/api/common/User'
import { CreateProductCxt } from '../../context/CreateProductCxt'

const GridItem = (props: GridProps) => <Grid xs={12} md={6} item {...props} />

// Vars
const data: CustomInputVerticalData[] = [
  {
    title: 'Regular Giveawy',
    value: '1',
    content: 'Normal Giveaway that will be listed on products page. this products is locally made.',
    asset: 'tabler-building',
    isSelected: true
  },
  {
    title: 'Stationery',
    value: '2',
    content: 'Giveaway that will be listed on products page under some brand the will be selected during process. ',
    asset: 'tabler-diamond'
  },
  {
    title: 'Custom print Type',
    value: '3',
    content: 'Custom print service.select this to add new type of custom print to your app.',
    asset: 'tabler-briefcase'
  }
]

function ProductDetailsForm({ categories, handleNext }: Props) {
  const {
    query: { data: product, refetch },
    setProductId,
    productId
  } = useContext(ProductContext)

  const { vendors } = useContext(CreateProductCxt)

  const schema = useMemo(() => {
    return z.object({
      name: z.string().min(1),
      description: z.string(),
      category_id: z.string().or(z.number()),
      type_id: z.string(),
      size: z.boolean(),
      color: z.boolean(),
      scaling: z.boolean(),
      image: product?.id ? z.array(z.instanceof(File)).optional() : z.array(z.instanceof(File)).min(1),
      brand_id: z.string().or(z.number()).optional().nullable(),
      feature: z.string().or(z.number()).optional()
    })
  }, [product?.id])

  type SchemaType = z.infer<typeof schema>

  // Form
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    control,
    watch,
    reset,
    getValues
  } = useForm<SchemaType>({
    resolver: zodResolver(schema)
    // defaultValues: product
    //   ? {
    //       name: product.name,
    //       brand_id: product.brand_id,
    //       type_id: product.type_id ? `${product.type_id}` : undefined,
    //       category_id: product.category_id ? `${product.category_id}` : undefined,
    //       size: product?.size == 1 ? true : false,
    //       color: product?.color == 1 ? true : false,
    //       scaling: product?.scaling == 1 ? true : false
    //     }
    //   : undefined
  })

  useEffect(() => {
    if (productId && product) {
      reset({
        name: product.name,
        brand_id: product.brand_id,
        type_id: product.type_id ? `${product.type_id}` : undefined,
        category_id: product.category_id ? `${product.category_id}` : undefined,
        size: product?.size == 1 ? true : false,
        color: product?.color == 1 ? true : false,
        scaling: product?.scaling == 1 ? true : false,
        description: product?.description
      })
    } else {
      reset({})
    }
  }, [productId])

  // type watcher
  const watchedType = watch('type_id')

  const onSubmit = useCallback(
    handleSubmit(async data => {
      try {
        const body =
          +watchedType === 2
            ? {
                ...data,
                size: Boolean(data.size) ? 1 : 0,
                color: Boolean(data.color) ? 1 : 0,
                scaling: Boolean(data.scaling) ? 1 : 0
              }
            : {
                ...data,
                brand_id: undefined,
                size: Boolean(data.size) ? 1 : 0,
                color: Boolean(data.color) ? 1 : 0,
                scaling: Boolean(data.scaling) ? 1 : 0
              }

        const headers = await getClientAuthSession()

        const res = await (product?.id
          ? axios.put<{
              status: boolean
              message: string
              data: Product
            }>(api`dashboard/product/${product.id}`, serialize(body), { headers })
          : axios.post<{
              status: boolean
              message: string
              data: Product
            }>(api`dashboard/product`, serialize(body), { headers }))

        setProductId(res.data.data.id)
        refetch()
        handleNext()
      } catch (error: any) {
        console.log('errorerror', error)
        const errorMessage = `${error?.status ?? '500'} - ${error?.response?.data?.message ?? 'Unexpected error'}`

        toast.error(errorMessage)
      }
    }),
    [product?.id]
  )

  return (
    <Box component={'form'} noValidate onSubmit={onSubmit}>
      <Grid container spacing={6}>
        <Controller
          control={control}
          name={'type_id'}
          render={({ field }) => (
            <>
              {data.map((item, index) => {
                let asset

                if (item.asset && typeof item.asset === 'string') {
                  asset = <i className={classNames(item.asset, 'text-[28px]')} />
                }

                return (
                  <CustomInputVertical
                    type='radio'
                    key={index}
                    gridProps={{ sm: 4, xs: 12 }}
                    selected={field.value}
                    name='custom-radios-basic'
                    handleChange={v => field.onChange(v)}
                    data={typeof item.asset === 'string' ? { ...item, asset } : item}
                  />
                )
              })}
            </>
          )}
        />
        <GridItem>
          <AddLabelToEl label='Product Name' error={errors.name?.message}>
            <TextField placeholder='Name' {...register('name')} />
          </AddLabelToEl>
        </GridItem>

        {/* category */}
        {/* <GridItem>
          <AddLabelToEl label='Product Category'>
            <Select {...register('category_id')} placeholder='Select a Category'>
              {Array.isArray(vendors) &&
                vendors?.map(vendor => (
                  <MenuItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </MenuItem>
                ))}
            </Select>
          </AddLabelToEl>
        </GridItem> */}

        {/* brand */}
        {+watchedType === 2 && (
          <Grid xs={6} p={4}>
            <AddLabelToEl label='Product Brand'>
              <Select {...register('brand_id')} placeholder='Select a Brand'>
                {Array.isArray(vendors) &&
                  vendors?.map(vendor => (
                    <MenuItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </MenuItem>
                  ))}
              </Select>
            </AddLabelToEl>
          </Grid>
        )}

        {/* description */}
        <Grid xs={12} m={3}>
          <AddLabelToEl label='Description' error={errors.description?.message}>
            <TextField multiline minRows={2} placeholder='Description' {...register('description')} />
          </AddLabelToEl>
        </Grid>

        <Grid xs={12}>
          <Typography m={2} ml={5} fontSize={20} fontWeight={700}>
            You can Control
          </Typography>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
            <FormControlLabel
              control={<Checkbox {...register('size')} defaultChecked={product?.size == 1} />}
              label='Size'
            />
            <FormControlLabel
              control={<Checkbox {...register('color')} defaultChecked={product?.color == 1} />}
              label='Color'
            />
            <FormControlLabel
              control={<Checkbox {...register('scaling')} defaultChecked={product?.scaling == 1} />}
              label='Scale'
            />
          </Stack>
        </Grid>

        <GridItem>
          <AddLabelToEl label='Category' error={errors.category_id?.message}>
            <Controller
              control={control}
              name='category_id'
              render={({ field }) => {
                return (
                  <TextField
                    select
                    placeholder='Select an Category'
                    value={field.value || ''}
                    onChange={e => field.onChange(e.target.value)}
                  >
                    {categories.map(({ id, name }) => (
                      <MenuItem key={id} value={`${id}`}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                )
              }}
            />
          </AddLabelToEl>
        </GridItem>

        <GridItem md={12}>
          <AddLabelToEl label='Images' error={errors.image?.message}>
            <Controller
              name='image'
              control={control}
              render={({ field }) => (
                <FilePond
                  files={field.value}
                  onupdatefiles={files => {
                    field.onChange(files.map(filepondFile => filepondFile.file))
                  }}
                  allowMultiple={true}
                  acceptedFileTypes={['image/*']}
                />
              )}
            />
          </AddLabelToEl>
        </GridItem>
      </Grid>
      <LoadingButton loading={isSubmitting} type='submit' variant='contained' fullWidth>
        Submit
      </LoadingButton>
    </Box>
  )
}

type Props = {
  categories: Category[]
  handleNext: () => void
}
export default ProductDetailsForm
