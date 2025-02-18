import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { Brand } from '@/types/api/common/Brand'
import type { Category } from '@/types/api/common/Product'

export interface VendorProductsLookups {
  status: boolean
  message: string
  data: {
    brands: Brand[]
    categories: Category[]
    types: Category[]
  }
}

export const getVendorsProductsLookups = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<VendorProductsLookups>(api`dashboard/vendor/lookups`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}
