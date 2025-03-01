import { z } from 'zod'

export const OfferSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  client_id: z.string().min(1, 'client_id is required'),
  type_id: z.number().min(1, 'type_id is required'),
  category_id: z.number(),
  product_id: z.number().min(1, 'product_id is required'),
  paper_id: z.number().min(1, 'product_id is required'),
  note: z.string().optional(),
  file: z.array(z.instanceof(File)).optional(),
  description: z.string().optional(),
  quantity: z.string().min(1, 'quantity is required'),
  processing_days: z.string().min(1, 'processing_days is required'),
  discounted_price: z.string().min(1, 'discounted_price is required')
})
export type OfferSchemaType = z.infer<typeof OfferSchema>
