import { NextApiRequest, NextApiResponse } from 'next';
import { tourSchedule } from '@/models';
import { tourDef } from '@/utils/types';
import db from '@/utils/database'

const getTour = async (req: NextApiRequest, res: NextApiResponse) => {
    const { _id } = req.query
    try{
        await db()
        const tourList : tourDef | null = await tourSchedule.findById({_id})
        res.status(200).json({tourList})
    }catch(e) {
        res.status(500).json({message: 'Error'})
    }
}

export default getTour