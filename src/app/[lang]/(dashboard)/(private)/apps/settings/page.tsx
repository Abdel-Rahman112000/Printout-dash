import DepositSetting from './DepositSetting'
import { SettingsCxtProvider } from './SettingCxt'

export default function SettingPage() {
  return (
    <SettingsCxtProvider>
      <DepositSetting />
    </SettingsCxtProvider>
  )
}
