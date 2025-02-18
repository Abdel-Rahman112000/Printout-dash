import { VendorsProductsCxtProvider } from './context'
import VendorProductsEntryPoint from './components/entrypoint'

export default function VendorProductsView() {
  return (
    <VendorsProductsCxtProvider>
      <VendorProductsEntryPoint />
    </VendorsProductsCxtProvider>
  )
}
