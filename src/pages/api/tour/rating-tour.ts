import db from '@/utils/database'
import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { tourRating, user, tourSchedule } from '@/models'

const ratingTour = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({code: 2, message: 'Only POST requests are allowed'})
    }

    const { rating, comment, tourId } = req.body
    const session = await getServerSession(req, res, authOptions)

    const ObjectId = mongoose.Types.ObjectId

    try{
        await db()
        const userId = await user.findOne({
            email: session?.user?.email,
        })
        let ratingId = ''
        await tourRating.create({
            rating,
            comment,
            user: userId,
            tour: tourId,
        }).then(doc => {
            ratingId = doc._id
        })
        .catch(err => {
            res.status(500).json({code: 1, message: 'Server error'})
        });
        await user.updateOne({
            email: session?.user?.email,
        }, { $push: { ratingRef: new ObjectId(ratingId) }})
        await tourSchedule.updateOne({
            _id: new ObjectId(tourId)
        }, { $push: { rating: new ObjectId(ratingId) }})
        res.status(200).json({code: 0, message: 'Rating successfully!!'})
    }catch(e){
        res.status(500).json({code: 1, message: 'Server error'})
    }
}

export default ratingTour