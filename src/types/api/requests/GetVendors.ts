import type { User } from '../common/User'

export interface GetVendorsRoot {
  status: boolean
  message: string
  data: User[]
}
