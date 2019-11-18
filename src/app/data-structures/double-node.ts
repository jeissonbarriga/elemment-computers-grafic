export class DoubleNode<T> {

    key: T;
    next: DoubleNode<T>;
    prev: DoubleNode<T>;

    constructor(key: T){
        this.key = key;
    }

}