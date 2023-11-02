import db from '@/utils/database'
import { user } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'

const setPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({ code: 2, message: 'Only POST requests are allowed' })
        return
    }

    const { email, password } = req.body

    const hashPass = await hash(password as string, 10)

    try{
        await db()
        await user.updateOne({ email }, { password: hashPass } )
        res.status(200).json({ code: 0, message: 'Change password successfully' })
    }catch(e){
        res.status(500).json({ code: 1, message: 'Server error' })
    }
} 

export default setPassword