import { NextApiRequest, NextApiResponse } from 'next';
import { user } from '@/models';
import { hash } from 'bcrypt';
import db from '@/utils/database'

const checkUser = async (email: string) => {
    try{
        await db()
        const userData = await user.findOne({ email: email })
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

    if(req.method !== 'POST'){
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const { name, email, password, tel } = req.body
    
    try{
        if(await checkUser(email as string)){
            res.status(200).json({message: 'Account already exists', status: 'error'})
        }else{
            const hashPass = await hash(password as string, 10)
            user.insertMany({
                fullname: name,
                email: email,
                password: hashPass,
                tel: tel,
            })
            res.status(200).json({message: 'Created account successfully', status: 'success'})
        } 
    }
    catch(e){
        res.status(500).json({message: 'Error'})
    }
}

export default saveUser