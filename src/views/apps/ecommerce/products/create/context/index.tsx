'use client'

import { createContext } from 'react'

import type { useProductHooksType } from './hooks'
import useProductHooks from './hooks'
import type { ChildrenType } from '@/@core/types'

export const ProductContext = createContext<useProductHooksType>({} as useProductHooksType)

export function ProductContextProvider({
  children,
  productId
}: ChildrenType & {
  productId?: number | string
}) {
  const productHooks = useProductHooks(productId)

  return <ProductContext.Provider value={productHooks}>{children}</ProductContext.Provider>
}
