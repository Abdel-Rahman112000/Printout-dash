'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getClientAuthSession } from '@/utils/headers/authClient'
import { getProduct } from '@/utils/api/products/getProduct'

function useProductHooks(overrideProductId?: string | number) {
  const [productId, setProductId] = useState<undefined | number | string>(undefined)
  const productIdToUse = overrideProductId || productId
  const [fetchCounts, setFetchCounts] = useState(0)

  const query = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productIdToUse) return undefined

      const headers = await getClientAuthSession()

      const data = await getProduct(productIdToUse, headers)

      setFetchCounts(x => x + 1)

      return data
    }
  })

  return {
    query,
    productId: productIdToUse,
    setProductId,
    fetchCounts
  }
}

export type useProductHooksType = ReturnType<typeof useProductHooks>

export default useProductHooks
