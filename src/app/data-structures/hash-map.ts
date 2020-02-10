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

    polyHash(userName: string) {
        let hash = 0;
        for(let i = userName.length - 1; i >= 0; i--) {
            let charCode = userName.charCodeAt(i);
            hash = (hash * this.x + charCode) % this.prime;
        }
        console.log(userName + " Hashed to " + hash);
        return hash;
        
    }

    integerHash(integer: number) {
        let hash = 0;
        hash = ((this.a * integer + this.b) % this.prime) % this.m;
        console.log(integer + " Hashed to " + hash);
        return hash;
    }

    fullHash(userName: string) {
        let hash = this.polyHash(userName);
        hash = this.integerHash(hash);
        return hash;
    }

    rehash() {
        let loadFactor = this.n/this.m;
        if(loadFactor > 0.9) {
            console.log("Rehashing... load factor = " + loadFactor);
            let newMap = [];
            this.m = this.m * 2;
            this.n = 0;
            this.pickRandomHashFunc();
            for(let i = 0; i < this.map.length; i++) {
                let chainNode = this.map[i];
                if(chainNode != null) {
                    while(chainNode != null) {
                        this.set(chainNode.key, chainNode.value, newMap, true);
                        chainNode = chainNode.next;
                    }
                }
            }
            this.map = newMap;
        }
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