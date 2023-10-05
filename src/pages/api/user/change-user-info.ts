import db from '@/utils/database'
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { user } from '@/models';

const changeUserInfo = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({ code: 2, message: 'Only POST requests allowed'})
        return
    }

    const { fullName, tel, day, month, year } = req.body

    const session = await getServerSession(req,res,authOptions)

    try{
        await db()
        await user.findOneAndUpdate({
            email: session?.user?.email
        }, {
            fullName, tel, day, month, year
        })
        res.status(200).json({code: 0, message: 'Change Infomation Success!'})
    }catch(e){
        res.status(500).json({code: 1, message: 'Server error'})
    }
}

export default changeUserInfo