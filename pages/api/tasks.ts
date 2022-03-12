import { NextApiRequest , NextApiResponse} from 'next'

export default function(req:NextApiRequest,res:NextApiResponse){
    const tasks = [
        {
            id:"1",
            name:'Walk Dog',
            description:"Walk with my favoruite dog Alan",
            date:new Date('2022','03','12'),
            completed:false
        },
        {
            id:"2",
            name:'Go Shopping',
            description:"Go shopping with my girlfriend Jenny",
            date:new Date('2022','03','02'),
            completed:true
        },
        {
            id:"3",
            name:'Go To Cinema',
            description:"Go to cinema to watch new sci-fi movie",
            completed:false,
            date:new Date()
        },
        {
            id:"4",
            name:'Send Invoices',
            description:"Send Invoices to my boss",
            date:new Date('2022','02','02'),
            completed:true
        },
        {
            id:"5",
            name:'Reply',
            description:"Reply to people from unreaded emails",
            date:new Date('2022','04','02'),
            completed:false
        },
        {
            id:"6",
            name:'Check To do lis',
            description:"Check my resposibilities",
            date:new Date('2022','03','12'),
            completed:false
        },
    ]
    res.json({tasks:tasks})
}