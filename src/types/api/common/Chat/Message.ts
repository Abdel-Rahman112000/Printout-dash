import type { Media } from '../Media'

export interface MessageType {
  senderId: number
  message: string
  receiver_id: number
  timestamp: string
  created_at: string
  id: number
  receiver_type: string
  sender_id: number
  sender_type: string
  type: string
  updated_at: string
  media?: Media[]
  docs?: {
    media?: Media[]
  }
}
