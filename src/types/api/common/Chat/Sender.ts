import type { Media } from '../Media'

export type SenderType = {
  cfm_token: string
  commerce_registration: string
  company_name: string
  created_at: string
  email: string
  email_verified_at: string
  id: number
  media: Media[]
  otp: string
  otp_expires_at: string
  phone: string
  type: string
  updated_at: string
  user_name: string
}
