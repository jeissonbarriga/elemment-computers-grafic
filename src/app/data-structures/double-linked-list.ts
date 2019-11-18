import { Injectable } from '@angular/core';
import { DoubleNode } from './double-node';

@Injectable({
    providedIn: 'root',
})
export class DoubleLinkedList<T> {

    head: DoubleNode<T>;
    tail: DoubleNode<T>;
    size: number;
    
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }    

    pushFront(key: T){
        let new_node = new DoubleNode<T>(key);
        
        if(this.head == null) {
            this.head = new_node;
            this.tail = new_node;
        } else {
            new_node.next = this.head;
            new_node.prev = null;
            this.head.prev = new_node;
            this.head = new_node;
        }
        this.size ++;
    }
    
    pushBack(key: T){
        let new_node = new DoubleNode<T>(key);
        
        if(this.tail == null) {
            this.tail = new_node;
            this.head = new_node;
        } else {
            new_node.prev = this.tail;
            new_node.next = null;
            this.tail.next = new_node;
            this.tail = new_node;
        }
        this.size ++;
    }

    findByKey(key: T): DoubleNode<T>{
        
        let current_node: DoubleNode<T> = this.head;
        
        while (current_node !=  null)
        {
            //if(current_node.key.compareTo(key)) {
            if(current_node.key == key) {
                return current_node;
            } else {
                current_node = current_node.next;
            }
        }
        
        return null;
    }

    popBack(){
        if(this.head == null) {
            console.error("Error!!. Empty List");
            return;
        }
        
        if(this.head == this.tail)
        {
            this.tail = null;
            this.head = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
    }

    remove(node: DoubleNode<T>) {
        let next = node.next;
        let prev = node.prev;
        prev.next = next;
        next.prev = prev;
    }


    displayList(){
        if(this.size == 0){
            console.log("Empty list");
        } else {
            let node = this.head;
            while(node != null){
                console.log(node.key);
                node = node.next;
            }
        }
    }

    clearList(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

}