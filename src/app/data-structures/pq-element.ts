export class PQElemment<T>{
    element: T;
    priority: number;
    
    constructor(element:T, priority: number){
        this.element = element;
        this.priority = priority;
    }
}