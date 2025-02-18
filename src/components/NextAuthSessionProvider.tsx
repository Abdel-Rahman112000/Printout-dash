'use client'

import type { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'
import { registerPlugin } from 'react-filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidate from 'filepond-plugin-file-validate-type'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidate)

function NextAuthSissionProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthSissionProvider
