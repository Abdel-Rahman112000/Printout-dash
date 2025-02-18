'use client'

import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getClientAuthHeaders } from '@/utils/headers/authClient'
import { getCategories } from '@/utils/api/categories/getCategories'
import type { Category } from '@/types/api/common/Category'

export const CategoryCxt = createContext<CategoryCxtType>({
  categories: undefined,
  editedCategory: undefined,
  handleRefreshCategoriesData: () => {},
  handleSetEditedCategory: (cat: Category | undefined) => {}
})

export const CategoryCxtProvider = (props: PropsType) => {
  // TODO::declare and define component state and variables
  const { children } = props
  const [editedCategory, setEditedCategory] = useState<Category>()

  const { data: categories, refetch: refreshVendorsData } = useQuery({
    queryKey: [`categories-data-list`],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      const response = await getCategories(headers)

      return response
    }
  })

  // TODO::declare and define helper methods
  function handleRefreshCategoriesData() {
    refreshVendorsData()
  }

  function handleSetEditedCategory(cat: Category | undefined) {
    setEditedCategory(cat)
  }

  // ** return component ui
  return (
    <CategoryCxt.Provider value={{ categories, editedCategory, handleRefreshCategoriesData, handleSetEditedCategory }}>
      {children}
    </CategoryCxt.Provider>
  )
}

type PropsType = { children: ReactNode }
type CategoryCxtType = {
  editedCategory: Category | undefined
  handleRefreshCategoriesData(): void
  categories: Category[] | null | undefined
  handleSetEditedCategory(cat: Category | undefined): void
}
