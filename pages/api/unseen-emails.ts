// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function gmailInbox(req: NextApiRequest,res: NextApiResponse) {

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
        tlsOptions: { rejectUnauthorized:false },
    }
};
    const emails = await imaps.connect(config)
            .then((connection:any) => {
                return connection.openBox('INBOX')
                    .then(() => {
                            // Fetch emails from the last 24h
                        const delay = 24 * 3600 * 1000;
                        let yesterday:any = new Date();
                        yesterday.setTime(Date.now() - delay);
                        yesterday = yesterday.toISOString();
                        const searchCriteria = ['UNSEEN', ['SINCE', yesterday]];
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
