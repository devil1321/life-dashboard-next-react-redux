import { NextApiRequest , NextApiResponse} from 'next'
import { Task } from '../../interfaces'
import moment from 'moment'
export default function(req:NextApiRequest,res:NextApiResponse){

    const tasks:Task[] = [
        {
            id:"1",
            name:'Walk Dog',
            description:"Walk with my favoruite dog Alan",
            date:new Date('2022-03-12'),
            completed:false
        },
        {
            id:"2",
            name:'Go Shopping',
            description:"Go shopping with my girlfriend Jenny",
            date:new Date('2022-03-11'),
            completed:true
        },
        {
            id:"3",
            name:'Go To Cinema',
            description:"Go to cinema to watch new sci-fi movie",
            completed:false,
            date:new Date('2022-09-03'),
        },
        {
            id:"4",
            name:'Send Invoices',
            description:"Send Invoices to my boss",
            date:new Date('2022-03-14'),
            completed:true
        },
        {
            id:"5",
            name:'Reply',
            description:"Reply to people from unreaded emails",
            date:new Date('2022-04-03'),
            completed:false
        },
        {
            id:"6",
            name:'Check To do lis',
            description:"Check my resposibilities",
            date:new Date('2022-03-13'),
            completed:false
        },
    ]
    res.json({tasks:tasks})
}