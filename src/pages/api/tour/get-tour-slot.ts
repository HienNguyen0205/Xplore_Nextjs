import db from '@/utils/database'
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";
import { bookHistory } from '@/models';

const getTourSlot = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET'){
        res.status(405).json({ code: 2, message: 'Only GET requests allowed'})
        return
    }

    const { id } = req.query
    const ObjectId = mongoose.Types.ObjectId

    try{
        await db()
        let avaiSlot = 20
        const quantity = await bookHistory.find({
            tourId: new ObjectId(id as string)
        }, 'quantity slot')
        if(quantity.length !== 0){
            const slot = quantity.reduce((prev, curr) => prev + curr.quantity,0)
            avaiSlot = quantity[0].slot - slot
        }
        res.status(200).json({code: 0, avaiSlot})
    }catch(e){
        res.status(500).json({code: 1, message: 'Server error'})
    }
}

export default getTourSlot