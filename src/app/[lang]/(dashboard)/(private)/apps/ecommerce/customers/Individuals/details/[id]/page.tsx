// Next Imports
import { redirect } from 'next/navigation'

// Type Imports
import type { Customer } from '@/types/apps/ecommerceTypes'

// Component Imports
import CustomerDetails from '@/views/apps/ecommerce/customers/Individuals/details'

// Data Imports
import { getEcommerceData } from '@/app/server/actions'
import { getClients, useClients } from '@/utils/api/Customers/getCustomers'
import { getServerAuthHeaders } from '@/utils/headers/authServer'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/ecommerce` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getEcommerceData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/ecommerce`)

  if (!res.ok) {
    throw new Error('Failed to fetch ecommerce data')
  }

  return res.json()
} */

const CustomerDetailsPage = async ({ params }: { params: { id: string } }) => {
  // ❶ الهيدرز المطلوبة للمصادقة
  const headers = await getServerAuthHeaders()

  // ❷ كل العملاء
  const clients = await getClients(headers) // النوع Clients[]

  // ❸ ابحث عن العميل اللي الـ id بتاعه يطابق param
  const customer = clients.find(client => String(client.id) === params.id) as Customer | undefined

  // ❹ لو مش موجود ▸ حوِّل لصفحة not‑found
  if (!customer) {
    redirect('/not-found')
  }

  // ❺ مرِّر العنصر الفردي للمكوِّن
  return <CustomerDetails customerData={customer} customerId={params.id} />
}

export default CustomerDetailsPage
