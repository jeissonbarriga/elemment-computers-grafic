import { Injectable } from '@angular/core';
import { DoubleNode } from './double-node';

@Injectable({
    providedIn: 'root',
})
export class Queue<T> { 

    head: DoubleNode<T>;
    tail: DoubleNode<T>;

    constructor(){
        this.head = null;
        this.tail = null;
    }   
    
    enqueue(key: T) {
        let newNode = new DoubleNode<T>(key);
        if(this.head == null){
            this.head = newNode;
            this.tail = newNode;
        }else{
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }
    
    dequeue() : T {
        if(this.head == null){
            console.error("Error!! Queue is empty");
        }
        let auxNode = new DoubleNode<T>(this.head.key);
        this.head.next.prev = null;
        this.head = this.head.next;
        return auxNode.key;
    }
    
    isEmpty() : boolean {
        if(this.head == null){
            return true;
        }
        return false;
    }

    displayQueue() {
        if(this.head == null){
            console.log("Empty queue");
        } else {
            let node = this.head;
            while(node != null){
                console.log(node.key);
                node = node.next;
            }
        }
    }

    clearQueue(){
        this.head = null;
        this.tail = null;
    }

}