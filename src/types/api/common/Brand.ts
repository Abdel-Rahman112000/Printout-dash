import type { Media } from './Media'

export interface Brand {
  id: number
  created_at: string
  updated_at: string
  pictures: any[]
  name: string
  media?: Media[]
}
