import { AdminsOnly } from '@/guards/admin.gard'
import VendorsMainView from '@/views/apps/vendors'

function VendorsPage() {
  return <VendorsMainView />
}

export default AdminsOnly(VendorsPage)
