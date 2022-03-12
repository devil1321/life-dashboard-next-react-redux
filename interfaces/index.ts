
export interface WheatherWidgetProps {
    data:{
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