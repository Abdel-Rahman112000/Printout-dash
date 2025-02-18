'use server'
import { getServerSession } from 'next-auth'

import { getAuthHeadersFromSession } from './getAuthHeadersFromSession'

import { authOptions } from '@/libs/auth'
import type { AuthHeaders } from '@/types/AuthHeaders'

export const getServerAuthHeaders = async (headers?: Record<string, string>): Promise<AuthHeaders> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.token) return { ...headers }

  return { ...headers, ...getAuthHeadersFromSession(session) }
}
