// Next Imports
import { headers } from 'next/headers'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Component Imports

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Config Imports
import { i18n } from '@configs/i18n'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import NextAuthSissionProvider from '@/components/NextAuthSessionProvider'
import ReactQueryClientProvider from '@/components/ReactQueryProvider'
import OnClientCheckAuth from '@/components/check-auth'

export const metadata = {
  title: 'Printout Dashboard',
  description:
    'Vuexy - MUI Next.js Admin Dashboard Template - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.'
}

const RootLayout = ({ children, params }: ChildrenType & { params: { lang: Locale } }) => {
  // Vars
  const headersList = headers()
  const direction = i18n.langDirection[params.lang]

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <NextAuthSissionProvider>
        <ReactQueryClientProvider>
          <OnClientCheckAuth />
          <html id='__next' lang={params.lang} dir={direction}>
            <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
          </html>
        </ReactQueryClientProvider>
      </NextAuthSissionProvider>
    </TranslationWrapper>
  )
}

export default RootLayout
