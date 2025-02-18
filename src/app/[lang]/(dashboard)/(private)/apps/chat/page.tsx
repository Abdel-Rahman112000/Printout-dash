import { notFound } from 'next/navigation'

import ChatTabs from './components/tabs'
import { ChatContextProvider } from './context'
import { getMeData } from '@/utils/api/auth/get-me'
import { getServerAuthHeaders } from '@/utils/headers/authServer'
import { getDeliveryMenList } from '@/utils/api/delivery/get-delivery-list'
import { getClientsList } from '@/utils/api/delivery/get-clients-list'
import { AdminsOnly } from '@/guards/admin.gard'

const ChatPage = async () => {
  const headers = await getServerAuthHeaders()
  const { data: userData } = await getMeData(headers)
  const deliveryMenListRes = await getDeliveryMenList(headers)
  const clientsData = await getClientsList(headers)

  if (!userData || !deliveryMenListRes || !clientsData) {
    notFound()
  }

  return (
    <ChatContextProvider userData={userData} deliveryMenList={deliveryMenListRes} clients={clientsData}>
      <ChatTabs />
    </ChatContextProvider>
  )
}

export default AdminsOnly(ChatPage)
