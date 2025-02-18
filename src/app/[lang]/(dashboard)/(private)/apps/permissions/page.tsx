// Component Imports
import { notFound } from 'next/navigation'

import Permissions from '@views/apps/permissions'

// Data Imports
import { getPermissionsData } from '@/app/server/actions'
import { getRoles } from '@/utils/api/roles/getRoles'
import { getServerAuthHeaders } from '@/utils/headers/authServer'

const PermissionsApp = async () => {
  // Vars
  const data = await getPermissionsData()
  const headers = await getServerAuthHeaders()
  const roles = await getRoles(headers)

  if (!roles) notFound()

  return <Permissions roles={roles} permissionsData={data} />
}

export default PermissionsApp
