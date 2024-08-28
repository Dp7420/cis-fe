export class Services {
    serviceId?:number;
    serviceName:string;
    serviceShortName:string

    // categoryId?:number;
   
    category: {
        categoryName?:string;
        categoryId?:number;
    } = { categoryId: undefined};
}
