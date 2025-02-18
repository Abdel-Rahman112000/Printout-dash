// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProductListTable from '@views/apps/ecommerce/products/list/ProductListTable'
import ProductCard from '@views/apps/ecommerce/products/list/ProductCard'

// Data Imports
import { getEcommerceData } from '@/app/server/actions'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import { getProducts } from '@/utils/api/products/getProducts'
import type { Product } from '@/types/api/common/Product'
import { AdminsOnly } from '@/guards/admin.gard'

const ECommerceProductsList = async () => {
  // Vars
  const data = await getEcommerceData()

  const headers = await getServerAuthHeaders()

  const products = await getProducts(headers)

  if (!products) return null

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductCard />
      </Grid>
      <Grid item xs={12}>
        <ProductListTable productData={data?.products} products={products} />
      </Grid>
    </Grid>
  )
}

export type WithProducts = {
  products: Product[]
}

export default ECommerceProductsList
