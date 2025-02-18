import { Card, Divider, Stack } from '@mui/material'

import CustomizationDetailsCardHeader from './components/CardHeader'
import ProductFileImages from './components/fileImages'
import SettingSection from './components/SettingSection'
import CustomizationDetailsNotes from './components/notes'
import CustomizationProductDetailsUser from './components/user'
import { CustimizedProductCxtProvider } from './context'

export default function CustomizedProductDetails() {
  // const { lang: locale, id } = useParams()
  return (
    <CustimizedProductCxtProvider>
      <Card sx={{ p: 4 }}>
        <CustomizationDetailsCardHeader />
        <Stack spacing={5}>
          {/* <ProductFileImages /> */}
          <Divider flexItem />
          <SettingSection />
          <Divider flexItem />
          <CustomizationDetailsNotes />
          <Divider flexItem />
          <CustomizationProductDetailsUser />
        </Stack>
      </Card>
    </CustimizedProductCxtProvider>
  )
}
