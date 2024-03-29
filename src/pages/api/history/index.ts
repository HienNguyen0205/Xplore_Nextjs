import db from '@/utils/database'
import { NextApiRequest, NextApiResponse } from "next";
import { bookHistory } from '@/models';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const getHistory = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET'){
        res.status(405).json({ code: 2, message: 'Only GET requests allowed'})
        return
    }

    const session = await getServerSession(req,res, authOptions);

    const { from, to } = req.query

    try{
        await db()
        const history = await bookHistory.find({
            email: session?.user?.email,
            time: {
                $gte: new Date(from as string),
                $lte: new Date(to as string),
            }
        }).populate({
            path: 'schedule',
            select: 'date',
        }).populate({
            path: 'tour',
            select: 'departure route price destination',
        })
        res.status(200).json({ code: 0, history })
    }catch(err){
        res.status(500).json({ code: 1, message: 'Server error' })
    }
}

export default getHistory