import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const mailService = async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method !== 'POST'){
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const { name, email, content } = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        }
    })

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        subject: `${name} ${email}`,
        text: content as string,
    };
    
    transporter.sendMail(mailOptions, error => {
        if (error) {
            res.status(200).json({message: 'Send feedback fail!', status: 'fail'});
        } else {
          res.status(200).json({message: 'Send feedback successfully!', status: 'success'});
        }
    });
}

export default mailService