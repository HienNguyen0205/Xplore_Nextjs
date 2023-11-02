import db from '@/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { otp } from '@/models'

const checkOTP = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({ code: 3, message: 'Only POST requests are allowed'})
        return
    }

    const { email, code } = req.body

    try{
        await db()
        const verify = await otp.exists({
            email,
            code,
        })
        if(!!verify) {
            res.status(200).json({ code: 0 })
        }else{
            res.status(200).json({ code: 1 })
        }
    }catch(e){
        res.status(500).json({ code: 2, message: 'Server error' })
    }
}

export default checkOTP