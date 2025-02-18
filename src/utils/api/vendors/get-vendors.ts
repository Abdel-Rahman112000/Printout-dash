import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetVendorsRoot } from '@/types/api/requests/GetVendors'

export const getVendors = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetVendorsRoot>(api`dashboard/vendors`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}
