import db from '@/utils/database'
import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { tourSchedule } from '@/models'

const routeData = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method !== 'GET'){
        res.status(405).json({code: 1, message: 'Method not supported'})
        return
    }

    const { id } = req.query

    try{
        await db()
        const ObjectId = mongoose.Types.ObjectId;
        const routeData = await tourSchedule.aggregate([
            {
                $match: {
                    status: true,
                    routeId: new ObjectId("64f4895bf88448793f4e6899"),
                },
            },
            {
                $project: {
                    _id: 1,
                    departure: 1,
                    route: 1,
                    destination: 1,
                    date: 1,
                    price: 1,
                    rating: 1,
                },
            },
            {
                $limit: 4,
            },
        ]);
        const routeSelected = routeData.find((route) => route._id == id);
        res.status(200).json({code: 0, routeData, routeSelected })
    }catch(e){
        res.status(500).json({code: 2, message: 'Server error'})
    }
}

export default routeData