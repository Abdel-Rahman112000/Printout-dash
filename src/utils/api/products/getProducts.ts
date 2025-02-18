import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetProductsRoot } from '@/types/api/requests/Products'

export const getProducts = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetProductsRoot>(api`dashboard/product`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}
