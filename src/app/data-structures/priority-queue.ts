import { Injectable } from '@angular/core';
import { PQElemment } from './pq-element';

@Injectable({
  providedIn: 'root',
})
export class PriorityQueues<T> {

    //arr: Array<PQElemment<T>>;
    arr: Array<PQElemment<T>>;
    size: number;
    maxsize: number;

    constructor(max: number){
        this.arr = new Array<PQElemment<T>>(max);
        this.size = 0;
        this.maxsize = max;
    }

    parent(i:number): number{
        return Math.floor(i/2);
    }

    leftChild(i:number): number{
        return 2*i;
    }

    rightChild(i:number): number{
        return 2*i+1;
    }

    siftUp(i:number){
        while ( this.arr[this.parent(i)] != undefined && this.arr[i] != undefined && i > 1 && this.arr[this.parent(i)].priority<this.arr[i].priority){
            var aux = this.arr[i];
            this.arr[i] = this.arr[this.parent(i)];
            this.arr[this.parent(i)] = aux;
            i = this.parent(i);
        }
    }

    siftDown(i:number){
        var maxindex = i;
        var l = this.leftChild(i);
        var r = this.rightChild(i);
        if (l <= this.size && this.arr[l].priority>this.arr[maxindex].priority) maxindex = l; 
        if (r <= this.size && this.arr[r].priority>this.arr[maxindex].priority) maxindex = r;
        if (i != maxindex){
            var aux = this.arr[i];
            this.arr[i] = this.arr[maxindex];
            this.arr[maxindex] = aux;
            this.siftDown(maxindex);
        }
    }

    insert(element:T, priority: number){
        if (this.size == this.maxsize) console.error("Error!!");
        this.size++;
        let p = new PQElemment<T>(element, priority) ;
        this.arr[this.size] = p;
        this.siftUp(this.size);
    }

    extractMax():PQElemment<T>{
        let result = new PQElemment<T>(this.arr[1].element,this.arr[1].priority) ;
        this.arr[1] = this.arr[this.size]
        this.size--;
        this.siftDown(1);
        return result;
    }
    
    changePriority(i:number, p:PQElemment<T>){
        var oldp = this.arr[i].priority;
        this.arr[i] = p;
        if (p.priority>oldp) this.siftUp(i);
        else this.siftDown(i);
    }

    display(){
        if(this.size == 0){
            console.error("Error!!. Empty Priority Queue");
            return;
          } else{
            var i = 1;
            let element = this.arr[i];
            while(i != this.size+1){
              console.log(element.element);
              i++;
            }   
          }
    }

}