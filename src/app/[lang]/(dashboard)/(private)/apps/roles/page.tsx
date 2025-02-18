// Component Imports
import Roles from '@views/apps/roles'

// Data Imports
import { getUserData } from '@/app/server/actions'
import { getRoles } from '@/utils/api/roles/getRoles'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import { AdminsOnly } from '@/guards/admin.gard'

const RolesApp = async () => {
  // Vars
  const data = await getUserData()

  const headers = await getServerAuthHeaders()

  const roles = await getRoles(headers)

  if (!roles) return null

  return <Roles userData={data} roles={roles} />
}

export default AdminsOnly(RolesApp)
