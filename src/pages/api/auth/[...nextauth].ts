import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import db from '@/utils/database'
import { user } from '@/models'
import { compare } from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials){
        await db()
        const { email, password } = credentials as { email: string, password: string }
        const userData = await user.findOne({ email: email })
        const checkPass = await compare(password, userData.password)
        if(userData && checkPass) {
          return userData
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/sign-in',
  },
}

export default NextAuth(authOptions)