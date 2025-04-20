import type { Media } from './Media'

export type Category = {
  id: number
  created_at: string
  updated_at: string
  name: string
  featured?: boolean
  media: Media[]
}
