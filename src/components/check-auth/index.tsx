'use client'

import { useEffect } from 'react'

import { signOut } from 'next-auth/react'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { getRoles } from '@/utils/api/roles/getRoles'

function OnClientCheckAuth() {
  async function check() {
    try {
      const headers = await getClientAuthHeaders()

      if (headers.Authorization) {
        await getRoles(headers)
      }
    } catch (error) {
      signOut()
    }
  }

  useEffect(() => {
    check()
  }, [])

  return null
}

export default OnClientCheckAuth
