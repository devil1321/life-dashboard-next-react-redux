export interface Task {
    firebaseId?:string;
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
        file:any;
        company?:string;
        invoiceNR:string;
        date:string;
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
    fields:Field[]
    invoices:any;
    invoice:string;
}

export interface Field {
    isHeading:boolean;
    text?:string;
    name:string;
}

export interface Invoice{
    firebaseId?:string;
    invoiceNR:string;
    firstName:string;
    lastName:string;
    money:number;
    date:string;
    file:string;
}


export interface Contact {
    id:string;
    email:string;
    name:string;
    surname:string;
    phoneNumber:string;
    photoURL:string;
  }

export interface Message {
    id?:string;
    isRead:boolean;
    recipient_img:null | string;
    sender_img:null | string;
    msg:string;
    sender_id:string;
    recipient_email:string;
    sender_email:string;
}