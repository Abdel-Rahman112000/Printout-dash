import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { Product } from '@/types/api/common/Product'

interface ResponseRoot {
  status: boolean
  message: string
  data: Product[]
}

export const getVendorsUnAssignProducts = async (
  headers: AuthHeaders,
  brand_id?: string,
  category_id?: string,
  type_id?: string
) => {
  try {
    const res = await axios.get<ResponseRoot>(api`dashboard/vendor/product/select`, {
      headers,
      params: {
        brand_id,
        category_id,
        type_id
      }
    })

    return res.data?.data
  } catch (error) {
    return null
  }
}
