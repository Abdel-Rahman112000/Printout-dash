import axios from 'axios'

import { api } from '@/utils/api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { GetUesrsRoot } from '@/types/api/requests/GetUesrs'

export const getUsers = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetUesrsRoot>(api`dashboard/users`, { headers })

    return res.data?.data
  } catch (error) {
    return null
  }
}
