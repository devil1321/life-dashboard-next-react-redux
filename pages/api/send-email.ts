// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const nodemailer = require('nodemailer')


export default function sendEmail(req: NextApiRequest,res: NextApiResponse) {
    const body = JSON.parse(req.body)
    const mail = body.email
    const password = body.password
    const mailRegExp = new RegExp('gmail','gi')
    const isGmail = mail.match(mailRegExp)
    
    const from  = `${body.from}`
    const to = body.to
    const subject = body.subject
    const text = body.text

    let host = ''
    let port = 0
    
    if(isGmail){
        host = 'smtp.gmail.com'
        port = 465
    }else{
        host = 'smtp-mail.outlook.com'
        port = 587
    }

    console.log(req.body)

    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // secure:true for port 465, secure:false for port 587
        auth: {
            user: mail,
            pass: password
        },
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false,
        }
    });
    
    let mailOptions = {
        from:from, 
        to: to, 
        subject: subject, 
        text: text
    };
    new Promise((resolve:any,reject:any) => {
        transporter.sendMail(mailOptions, (error:any, info:any) => {
            if (error) {
                return console.log(error);
            }
        });
    }).then(()=>{
        res.json({msg:'Email Sended'})
    })

}
