import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HashMap {

    map: ChainNode [];
    //Cantidad de objetos en la estructura
    n: number;
    //Cardinalidad de la tabla
    m: number;

    //Polyhash params
    prime: number;
    x: number;
    
    //Integer hash params
    a: number;
    b: number;

    constructor() {
        this.map = [];
        this.n = 0;
        this.m = 5;
        this.prime = 2971215073;
        this.pickRandomHashFunc();
    }

  

}

export class ChainNode {
    key: string;
    value: number;
    next: ChainNode;

    constructor(key: string, value: number) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}