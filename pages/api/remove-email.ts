// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest,res: NextApiResponse) {

    const imaps = require('imap-simple');
    const simpleParser = require('mailparser').simpleParser;
    const _ = require('lodash');
    const mail = req.body.email
    const password = req.body.password
    const mailRegExp = new RegExp('gmail','gi')
    const isGmail = mail.match(mailRegExp)
    
    let host = ''
    
    if(isGmail){
        host = 'imap.gmail.com'
    }else{
        host = 'imap-mail.outlook.com'
    }
    
    
    var config = {
        imap: {
            user:mail,
            password:password,
            host:host,
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized:false }
        }
    };
    
    imaps.connect(config)
    .then((connection:any) => {
            connection.openBox('INBOX')
                .then(() => {
                    let searchCriteria = ['ALL'];
                    let fetchOptions = {
                    bodies: ['HEADER', 'TEXT', ''],
                };
                connection.search(searchCriteria, fetchOptions)
                .then(async(messages:any) => {
                    const emails:any = await Promise.all(messages.map(async(item:any) => item))
                    const email = emails.find((e:any) => e.attributes.uid === req.body.uid)
                    connection.addFlags(email.attributes.uid, "\Deleted", (err:any) => {
                        if (err){
                            console.log(err); 
                        }
                        res.json({msg:'email deleted'}); 
                    })
                })
            }) 
        })
        .catch((err:any) => console.log(err))
}
