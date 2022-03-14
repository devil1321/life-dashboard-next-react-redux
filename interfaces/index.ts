export interface Task {
    id:string;
    name: string;
    description: string;
    completed: boolean;
    date:any;
}


export interface WheatherWidgetProps {
    data:{
        wheather:{
            city:string;
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

    }
}