import db from '@/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/models';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth';

const changeAvatar = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        res.status(405).json({ code: 2, message: 'Only POST requests allowed'});
        return
    }

    const { avatar } = req.body
    const session = await getServerSession(req,res,authOptions)

    try{
        await db()
        await user.findOneAndUpdate({
            email: session?.user?.email
        }, { avatar })
        res.status(200).json({ code: 0, message: 'Update avatar successful'})
    }catch(e){
        res.status(500).json({ code: 1, message: 'Server error' })
    }
}

export default changeAvatar