// Component Imports
import { AdminsOnly } from '@/guards/admin.gard'
import OrderDetails from '@views/apps/ecommerce/orders/details'

const OrderDetailsPage = async ({ params }: { params: { id: string } }) => {
  return <OrderDetails />
}

export default OrderDetailsPage
