// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function gmailInbox(req: NextApiRequest,res: NextApiResponse) {

const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
const body = JSON.parse(req.body)
const mail = body.email
const password = body.password
const mailRegExp = new RegExp('gmail','gi')
// const isGmail = mail.match(mailRegExp)
let host = ''
console.log(req.body)
console.log(body)

if(true){
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
        tlsOptions: { rejectUnauthorized:false },
        connectTimeout:10000
    }
};
    try{
        const emails = await imaps.connect(config)
            .then((connection:any) => {
                return connection.openBox('INBOX')
                    .then(() => {
                        let searchCriteria = ['ALL'];
                        let fetchOptions = {
                        bodies: ['HEADER', 'TEXT', ''],
                    };
                    return connection.search(searchCriteria, fetchOptions)
                    .then(async(messages:any) => {
                        const emails:any = await Promise.all(messages.map(async(item:any) => {
                        let all = _.find(item.parts, { "which": "" })
                        let id = item.attributes.uid;
                        let idHeader = "Imap-Id: "+id+"\r\n";
                        const mail = await simpleParser(idHeader+all.body)
                        return {
                            id:mail.messageId,
                            uid:id,
                            date:mail.date,
                            from:mail.from,
                            subject:mail.subject,
                            mail:mail.html,
                        }
                    }))
                        return emails
                    })
                }) 
            })
            .then((emails:any) => emails)
            .catch((err:any) => console.log(err))

        res.json(emails)
    }
    catch(err){
        console.log(err)
    }
}
