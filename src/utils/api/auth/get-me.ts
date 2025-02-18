import axios from 'axios'

import type { AuthHeaders } from '@/types/AuthHeaders'
import { api } from '@/utils/api'
import type { User } from '@/types/api/common/User'

interface Root {
  status: boolean
  message: string
  data: User
}

export const getMeData = async (headers: AuthHeaders) => {
  const res = await axios.get<Root>(api`dashboard/auth/me`, {
    headers
  })

  return res.data
}
