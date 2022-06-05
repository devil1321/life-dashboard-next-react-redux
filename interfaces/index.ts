export interface Task {
    firebaseId?:string;
    userId:string;
    isOrder:boolean;
    isRejected?:string | boolean;
    name: string;
    description: string;
    completed?: boolean;
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
export interface InvoicesFormDataParams{
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
    totalMoney:number,
    moneyByMonth:number[],
    yearlyMoney:number,
    upFromLastMonth:number,
    yearlyMoneyByMonth:number[]
}

export interface ExtendFormData{
    [key:string]:string;
}

export interface Field {
    isHeading:boolean;
    text?:string;
    name:string;
}

export interface Invoice{
    userId:string;
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
    company:string,
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
    date:string,
}

export interface EmailAttachement {
    filenamee:string,
    content:string,
    encoding: string
}

export interface UserDetails{
    inbox_password:string,
    last_chat_recipient:string;
    email:string;
    name:string;
    surname:string;
    nip:string;
    photoURL:null | string;
    id:string;
    lock_screen_password:string;
    inbox_email:string;
    employee:string;
    company:string;
    phoneNumber:null | string;
    is_online:boolean;
    contacts:Contact[];
    invoiceFields:Field[]


}

export interface Notification{
    isRead:string;
    person:string,
    date:string,
    photoURL:null | string
}