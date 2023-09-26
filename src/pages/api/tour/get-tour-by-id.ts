import mongoose from "mongoose";
import db from '@/utils/database'
import { NextApiRequest, NextApiResponse } from "next";
import { tourSchedule } from "@/models";

const getTourById = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET'){
        res.status(405).json({code: 2, message: 'Only GET requests allowed' })
    }

    const { id } = req.query

    const ObjectId = mongoose.Types.ObjectId

    try{
        await db()
        const tourDetail = await tourSchedule.findOne({
            _id: new ObjectId(id as string)
        })
        res.status(200).json({code: 0, tourDetail})
    }catch(err){
        res.status(500).json({code: 1, message: 'Server Error'})
    }
}

export default getTourById