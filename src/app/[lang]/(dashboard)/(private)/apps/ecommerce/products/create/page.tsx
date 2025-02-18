import { getCategories } from '@/utils/api/categories/getCategories'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import CreateProject from '@/views/apps/ecommerce/products/create'

async function CreateProjectPage() {
  const headers = await getServerAuthHeaders()

  const categories = await getCategories(headers)

  if (!categories) return null

  return <CreateProject categories={categories} />
}

export default CreateProjectPage
