'use client'
import { useContext, useState } from 'react'

import { Button, CircularProgress, Grid, Stack, Tooltip, Typography } from '@mui/material'

import axios from 'axios'

import { toast } from 'react-toastify'

import { VendorsProductsCxt } from '../../context'
import { api } from '@/utils/api'
import { getClientAuthHeaders } from '@/utils/headers/authClient'

import type { Product } from '@/types/api/common/Product'

export default function VendorProductsList() {
  const { assignedProducts, assignProductsLoading } = useContext(VendorsProductsCxt)

  return (
    <Grid container>
      {assignProductsLoading && (
        <Grid item xs={12}>
          <Stack alignItems={'center'} justifyContent={'center'} height={200} width={'100%'}>
            <CircularProgress />
          </Stack>
        </Grid>
      )}
      {Array.isArray(assignedProducts) &&
        assignedProducts?.map(product => <ProductCard key={product?.id} product={product} />)}
    </Grid>
  )
}

const ProductCard = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState(false)
  const { handleRefreshAssignedProducts } = useContext(VendorsProductsCxt)
  const productName = product?.name?.length > 17 ? `${product?.name.slice(0, 15)}..` : product?.name

  const handleAssignProduct = async () => {
    setLoading(true)
    const headers = await getClientAuthHeaders()

    axios
      .post(
        api`dashboard/vendor/assign`,
        {
          product_id: product.id
        },
        {
          headers
        }
      )
      .then(() => {
        toast.success('Product unassigned to you successfully')
        handleRefreshAssignedProducts()
      })
      .catch(() => {
        toast.error('Unassign Product Faild')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Grid item xs={12} md={3}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'} spacing={3} p={2}>
        <Stack
          my={2}
          spacing={2}
          sx={{
            border: '1px solid lightgray',
            borderRadius: '12px',
            padding: '10px',
            transition: 'all 0.5s',
            ':hover': {
              transform: 'scale(1.02)',
              boxShadow: '0.5px 0.5px 1px 1px'
            }
          }}
        >
          <img
            src={product?.media?.[0]?.original_url}
            alt='product-image'
            width={200}
            height={250}
            style={{ objectFit: 'cover' }}
          />
          <Tooltip title={product.name} placement='top'>
            <Typography variant='body2' fontWeight={700} fontSize={20}>
              {productName ?? ''}
            </Typography>
          </Tooltip>
          <Button disabled={loading} variant='contained' onClick={handleAssignProduct}>
            Unassign
          </Button>
        </Stack>
      </Stack>
    </Grid>
  )
}
