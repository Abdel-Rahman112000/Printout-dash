import type { User } from '../common/User'

export interface GetUesrsRoot {
  status: boolean
  message: string
  data: User[]
}
