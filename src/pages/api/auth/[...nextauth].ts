import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import { user } from '@/models'
import { compare, hash } from 'bcrypt'

export const authOptions = {
  providers: [
    Credentials({
      name: 'Sign In',
      credentials: {
        email: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials){
        const { email, password } = credentials as { email: string, password: string }
        const userData = await user.findOne({email: email})
        if(userData && (await compare(userData.password,password))) {
          return userData
        }else{
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/signIn',
  },
}

export default NextAuth(authOptions)