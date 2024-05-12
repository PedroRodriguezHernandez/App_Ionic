export interface Publication{
    image: string,
    name: string,
    ingredient:{[key:string]:string},
    time:string;
    description: string[],
    id: string
}
