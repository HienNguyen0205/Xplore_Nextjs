import db from '@/utils/database'
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { user } from '@/models';

const changeUserInfo = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET'){
        res.status(405).json({ code: 2, message: 'Only GET requests allowed'})
        return
    }

    const session = await getServerSession(req,res,authOptions)

    try{
        await db()
        const avatar = await user.findOne({
            email: session?.user?.email
        }, 'avatar')
        res.status(200).json({code: 0, avatar: avatar.avatar})
    }catch(e){
        res.status(500).json({code: 1, message: 'Server error'})
    }
}

export default changeUserInfo