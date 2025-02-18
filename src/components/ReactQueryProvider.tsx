'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'

import type { ChildrenType } from '@/@core/types'

const queryClient = new QueryClient()

function ReactQueryClientProvider({ children }: ChildrenType) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </QueryClientProvider>
  )
}

export default ReactQueryClientProvider
