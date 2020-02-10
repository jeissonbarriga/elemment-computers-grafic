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

    pickRandomHashFunc() {
        this.x = Math.floor(Math.random() * (this.prime - 1)) + 1; // entre 1 y p-1
        this.a = Math.floor(Math.random() * (this.prime - 1)) + 1; // entre 1 y p-1
        this.b = Math.floor(Math.random() * this.prime); //entre 0 y p-1
    }

    hasKey(o: string) {
        let chainNode = this.map[this.fullHash(o)];

        while(chainNode.next != null) {
            if(chainNode.key == o) {
                return true;
            }
            chainNode = chainNode.next;
        }
        return false;
    }

    get(o: string) {
        let chainNode = this.map[this.fullHash(o)];

        while(chainNode.next != null) {
            if(chainNode.key == o) {
                return chainNode.value;
            }
            chainNode = chainNode.next;
        }
        return null;
    }

    set(o: string, value: number = 1, map: ChainNode [] = this.map, rehashing: boolean = false) {
        let hash = this.fullHash(o);
        let chainNode = map[hash];
        if(chainNode == null) {
            map[hash] = new ChainNode(o, rehashing  ? value : 1);
        } else {
            let prevNode = null;
            while(chainNode != null) {
                if(chainNode.key == o) {
                    chainNode.value = rehashing  ? value : chainNode.value + 1;
                    return;
                }
                prevNode = chainNode;
                chainNode = chainNode.next;
            }
            prevNode.next = new ChainNode(o, rehashing  ? value : 1);
        }
        this.n ++;
        this.rehash();
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