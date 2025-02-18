import type { Permission } from '../common/Permission'

export interface GetPermissionsRoot {
  status: boolean
  message: string
  data: Permission[]
}
