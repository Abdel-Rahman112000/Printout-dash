// Data Imports
import { AdminsOnly } from '@/guards/admin.gard'
import MainOrdersList from '@/views/apps/ecommerce/orders/mainOrdersList'

const OrdersListPage = async () => {
  // handle refresh orders data
  return <MainOrdersList />

  // return <OrderList orders={orders} />
}

export default OrdersListPage
