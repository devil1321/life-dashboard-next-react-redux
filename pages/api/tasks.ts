import { NextApiRequest , NextApiResponse} from 'next'
import { Task } from '../../interfaces'
import moment from 'moment'
export default function(req:NextApiRequest,res:NextApiResponse){

    const tasks:Task[] = [
        {
            id:"1",
            name:'Walk Dog',
            description:"Walk with my favoruite dog Alan",
            date:new Date(moment('2022,03,12').format('DD-MM-YYYY')),
            completed:false
        },
        {
            id:"2",
            name:'Go Shopping',
            description:"Go shopping with my girlfriend Jenny",
            date:new Date(moment('2022,03,16').format('DD-MM-YYYY')),
            completed:true
        },
        {
            id:"3",
            name:'Go To Cinema',
            description:"Go to cinema to watch new sci-fi movie",
            completed:false,
            date:new Date(moment('2022,03,11').format('DD-MM-YYYY')),
        },
        {
            id:"4",
            name:'Send Invoices',
            description:"Send Invoices to my boss",
            date:new Date(moment('2022,03,09').format('DD-MM-YYYY')),
            completed:true
        },
        {
            id:"5",
            name:'Reply',
            description:"Reply to people from unreaded emails",
            date:new Date(moment('2022,03,06').format('DD-MM-YYYY')),
            completed:false
        },
        {
            id:"6",
            name:'Check To do lis',
            description:"Check my resposibilities",
            date:new Date(moment('2022,02,12').format('DD-MM-YYYY')),
            completed:false
        },
    ]
    res.json({tasks:tasks})
}