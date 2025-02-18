'use client'

import { getSession, useSession } from 'next-auth/react'

import type { AuthHeaders } from '@/types/AuthHeaders'
import { getAuthHeadersFromSession } from './getAuthHeadersFromSession'

export const getClientAuthSession = async (headers?: AuthHeaders) => {
  const session = await getSession()

  if (!session?.user?.token) return { ...headers }

  return { ...headers, ...getAuthHeadersFromSession(session) }
}

export const getClientAuthHeaders = getClientAuthSession
