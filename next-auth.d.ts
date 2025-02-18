import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: {
      /** The user's name. */
      name?: string | null
      email?: string | null
      phone?: string | null
      roles?: any[] | null
      token?: string | null
      id?: string | null
      user_type?: string | null
      permissions?: any[] | null
    }
  }
}
