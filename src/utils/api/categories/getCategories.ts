import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetCategoriesRoot } from '@/types/api/requests/GetCategories'

export const getCategories = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetCategoriesRoot>(api`dashboard/category`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}
