import type { Media } from '../common/Media'
import type { Chat } from './Chat/Chat'
import type { MessageType } from './Chat/Message'

export type DeliveryMan = {
  id: number
  user_name: string
  email: string
  phone: string
  type: string
  company_name: string
  tax: string
  commerce_registration: string
  otp: string
  otp_expires_at: string
  email_verified_at: string
  created_at: string
  updated_at: string
  cfm_token: string
  media: Media[]
  chat?: Chat
  message?: MessageType
  global_id?: string
}
