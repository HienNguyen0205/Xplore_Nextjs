import db from '@/utils/database'
import { user } from '@/models'
import { hash, compare } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const changePass = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({ code: 2, message: 'Only POST requests are allowed' })
        return
    }

    const { password } = req.body

    const session = await getServerSession(req, res, authOptions)

    try{
        await db()
        const userData = await user.findOne({ email: session?.user?.email }, 'password')
        const isSame = await compare(password, userData.password)
        if(isSame){
            res.status(200).json({ code: 1, message: 'The new password must be different from the old password'})
        }else{
            const hashPass = await hash(password, 10)
            await user.findOneAndUpdate({ email: session?.user?.email }, { password: hashPass })
            res.status(200).json({ code: 0, message: 'Change password successfully' })
        }
    }catch(e){
        res.status(500).json({ code: 1, message: 'Server error' })
    } 
}

export default changePass