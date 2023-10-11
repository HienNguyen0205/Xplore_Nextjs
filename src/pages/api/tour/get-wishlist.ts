import db from '@/utils/database'
import { wishlists } from '@/models'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

const getWishlist = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET'){
        res.status(405).json({code: 2, message: 'Only GET requests are allowed'})
        return
    }

    const session = await getServerSession(req, res, authOptions)

    try{
        await db()
        let wishlist = await wishlists.find({
            userEmail: session?.user?.email,
        })
        wishlist = wishlist.map(item => item.tour)
        res.status(200).json({code: 0, wishlist})
    }catch(e){
        res.status(500).json({code: 1, message: 'Server error'})
    }
}

export default getWishlist