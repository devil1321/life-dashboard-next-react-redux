export interface Task {
    id:string;
    name: string;
    description: string;
    completed: boolean;
    date:any;
}


export interface WheatherProps {
       visibility:number;
       wind:{
           speed:number;
       }
       main:{
           temp:number;
           feels_like:number;
           humidity:number;
           pressure:number;
       }
       weather:{
           icon:string
           description:string;
           main:string;
       }[]
    }
export interface InvoicesFormDataParams {
    formData:{
        file:string;
        company?:string;
        invoiceNR:string;
        money:number;
        tax:number;
        bonuses:number;
        nip:string;
        firstName:string;
        lastName:string;
        adress:string;
        zip:string
        city:string;
    };
}
