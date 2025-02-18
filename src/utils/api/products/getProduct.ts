import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetProductRoot } from '@/types/api/requests/Products'

export const getProduct = async (productId: number | string, headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetProductRoot>(api`dashboard/product/${productId}`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}
