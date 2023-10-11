import db from '@/utils/database'
import mongoose from 'mongoose'
import { wishlists, tourSchedule } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const setWishlist = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({code: 2, message: 'Only POST requests are allowed'})
        return
    }

    const { id } = req.body

    const session = await getServerSession(req, res, authOptions)
    const ObjectId = mongoose.Types.ObjectId

    try{
        await db()
        const isExist = await wishlists.exists({
            userEmail: session?.user?.email,
            tour: new ObjectId(id)
        })
        if(!!isExist){
            await wishlists.findOneAndRemove({
                userEmail: session?.user?.email,
                tour: new ObjectId(id)
            })
            res.status(200).json({code: 0, message: 'Remove from wishlist successfully'})
            await tourSchedule.findOneAndUpdate({ _id: new ObjectId(id) }, { $pull: {
                wishlist: new ObjectId(isExist._id)
            }})
        }else{
            const _id = new ObjectId()
            wishlists.create({
                _id,
                userEmail: session?.user?.email,
                tour: new ObjectId(id)
            })
            res.status(200).json({code: 0, message: 'Add to wishlist successfully'})
            await tourSchedule.findOneAndUpdate({ _id: new ObjectId(id) }, { $push: {
                wishlist: _id
            }})
        }
    }catch(e){
        res.status(500).json({code: 1, message: 'Server error'})
    }
}

export default setWishlist