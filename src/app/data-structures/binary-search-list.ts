import { Injectable } from '@angular/core';
import { DoubleNode } from './double-node';
import { Product } from './product';

@Injectable({
    providedIn: 'root',
})
export class BinarySearchList<T> {

    root: DoubleNode<T>;
    head: DoubleNode<T>;
    tail: DoubleNode<T>;
    
    constructor(){
        this.root = null;
        this.head = null;
        this.tail = null;
    }   
    
    isProduct(x: T | Product): x is Product {
        return typeof (x as Product).id === "number";
    }

    insert(key: T){
        if(this.isProduct(key)){
            if(key.id > 2) console.log("Es mayor de 2!");
            if(this.root == null) this.pushFront(key);
            else{
                if(this.isProduct(this.root.key)){
                    if(key.id > this.root.key.id) this.pushBack(key);
                    else this.pushFront(key);
                }
            }
        }
    }

    pushFront(key: T){
        let new_node = new DoubleNode<T>(key);
        
        if(this.head == null) {
            this.root = new_node;
            console.log("Root changed");
            this.head = new_node;
            this.tail = new_node;
        } else {
            new_node.next = this.head;
            new_node.prev = null;
            this.head.prev = new_node;
            this.head = new_node;
        }
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
    }

    displayList(){
        if(this.root == null){
            console.log("Empty list");
        } else {
            console.log("Root is:");
            console.log(this.root.key);
            console.log("Now, the list is:");
            let node = this.head;
            while(node != null){
                console.log(node.key);
                node = node.next;
            }
        }
    }
}