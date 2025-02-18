import type { FC } from 'react'

import { redirect } from 'next/navigation'

import axios from 'axios'

import { Typography } from '@mui/material'

import { api } from '@/utils/api'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { User } from '@/types/api/common/User'

const NotAuthorized = () => <Typography>Not Authorized</Typography>

async function isAdmin(headers: AuthHeaders) {
  const currentUser = await axios.get<Root>(api`dashboard/auth/me`, {
    headers
  })

  console.log('currentUsercurrentUser', currentUser.data.data)

  return currentUser.data.data?.user_type == 'admin'
}

// Higher Order Function for auth check
export function AdminsOnly<T extends FC<any>>(ServerComponent: T) {
  // Returns a new function component
  return async function AuthenticatedComponent(props: any) {
    const headers = await getServerAuthHeaders()

    if (!headers.Authorization) redirect('/auth/login')

    try {
      const isadmin = await isAdmin(headers)

      if (!isadmin) redirect('/auth/login')

      return <ServerComponent {...props} />
    } catch (error) {
      console.log(error)

      return <NotAuthorized />
    }
  }
}

interface Root {
  status: boolean
  message: string
  data: User
}
