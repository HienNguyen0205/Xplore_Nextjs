import { NextApiRequest, NextApiResponse } from 'next';
import { tour } from '@/models';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const { attr } = req.query
        const tourOrder = await tour.find().sort(attr as string)
        res.status(200).json({ tourOrder: tourOrder});
    }catch(err){
        res.status(500).json({ message: 'Error'});
    }
}

export default handler