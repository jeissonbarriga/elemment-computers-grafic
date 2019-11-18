export class Product{
    id: number;
    name: string;
    price: number;
    description: string;

    constructor(id: number, name: string){
        this.id = id;
        this.name = name;
        this.price = 0;
        this.description = "";
    }
}