import db from '@/utils/database'
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";
import { bookHistory, schedule } from '@/models';

const getTourSlot = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET'){
        res.status(405).json({ code: 2, message: 'Only GET requests allowed'})
        return
    }

    const { id } = req.query
    const ObjectId = mongoose.Types.ObjectId

    try{
        await db()
        const historyData = await bookHistory.find({
            schedule: new ObjectId(id as string)
        }, 'quantity')
        const scheduleData = await schedule.findById(new ObjectId(id as string), 'slot')
        const avaiSlot = scheduleData.slot - historyData.reduce((prev, curr) => prev + curr.quantity, 0)
        if(avaiSlot > 0) {
            res.status(200).json({code: 0, avaiSlot})
        }else{
            res.status(500).json({code: 3, message: 'Slot number error'})
        }
    }catch(e){
        res.status(500).json({code: 1, message: 'Server error'})
    }
}

export default getTourSlot