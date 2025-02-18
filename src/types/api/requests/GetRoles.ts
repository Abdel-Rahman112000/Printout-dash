import type { Role } from '../common/Role'

export interface GetRoolsRoot {
  status: boolean
  message: string
  data: Role[]
}
