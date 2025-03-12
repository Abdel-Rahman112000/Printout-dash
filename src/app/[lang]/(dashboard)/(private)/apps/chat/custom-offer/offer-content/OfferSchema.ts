import { z } from 'zod'

export const OfferSchema = z.object({
  name: z.string().optional(),
  client_id: z.string().min(1, 'client_id is required'),
  type_id: z.string().min(1, 'type_id is required'),
  category_id: z.string(),
  product_id: z.string().min(1, 'product_id is required'),
  paper_id: z.string().optional(), // Initially optional
  height: z.number().optional(),
  width: z.number().optional(),
  note: z.string().optional(),
  file: z.array(z.instanceof(File)).optional(),
  description: z.string().optional(),
  qty: z.string().min(1, 'quantity is required'),
  processing_days: z.string().optional(),
  discounted_price: z.string().optional(),
  CustomizationChoices: z.array(z.number()).default([])
})

export type OfferSchemaType = z.infer<typeof OfferSchema>
