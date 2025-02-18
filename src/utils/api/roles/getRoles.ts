import axios from 'axios'

import type { GetRoolsRoot } from '@/types/api/requests/GetRoles'
import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'

export const getRoles = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetRoolsRoot>(api`dashboard/role`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}
