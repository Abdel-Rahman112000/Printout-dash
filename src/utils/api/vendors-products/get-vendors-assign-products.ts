import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { Product } from '@/types/api/common/Product'

interface ResponseRoot {
  status: boolean
  message: string
  data: Product[]
}

export const getVendorsAssignProducts = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<ResponseRoot>(api`dashboard/vendor/products`, {
      headers
    })

    return res.data?.data
  } catch (error) {
    return null
  }
}
