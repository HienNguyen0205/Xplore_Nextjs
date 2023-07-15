import { NextApiRequest, NextApiResponse } from 'next';
import { user } from '@/models';
import { hash } from 'bcrypt';
import db from '@/utils/database'

const checkUser = async (email: string) => {
    try{
        await db()
        const userData = await user.findOne({ email: email})
        if(userData){
            return true
        }
        return false
    }
    catch(e){
        console.error(e)
    }
}

const saveUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, password, tel } = req.query
    try{
        if(await checkUser(email as string)){
            user.create({
                fullname: name,
                email: email,
                password: await hash(password as string, 10),
                tel: tel,
            })
            res.status(200).json({message: 'Created account successfully', status: 'success'})
        }
        res.status(200).json({message: 'Account already exists', status: 'error'})
    }
    catch(e){
        res.status(500).json({message: 'Error'})
    }
}

export default saveUser