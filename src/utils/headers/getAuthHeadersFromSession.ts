import type { Session } from 'next-auth'

import type { AuthHeaders } from '@/types/AuthHeaders'

export const getAuthHeadersFromSession = (session: Session): AuthHeaders => {
  if (!session) return {}

  return { Authorization: `Bearer ${session.user?.token}` }
}
