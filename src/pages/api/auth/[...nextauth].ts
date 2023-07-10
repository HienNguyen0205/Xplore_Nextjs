import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { user } from '@/models'
import { compare } from 'bcrypt'

export const authOptions = {
  providers: [
    // CredentialsProvider({
    //   name: 'Sign In',
    //   credentials: {
    //     email: {
    //       label: 'Username',
    //       type: 'text',
    //     },
    //     password: { label: 'Password', type: 'password' }
    //   },
    //   async authorize(credentials){
    //     const { email, password } = credentials as { email: string, password: string }
    //     const userData = await user.findOne({email: email})
    //     if(userData && (await compare(userData.password,password))) {
    //       return userData
    //     }
    //     return null
    //   }
    // })
  ],
  pages: {
    signIn: '/signIn',
  },
}

export default NextAuth(authOptions)