export interface Publication{
    image: string,
    name: string,
    ingredient:{[key:string]:number},
    time:number;
    description: string,
    id: string
}
