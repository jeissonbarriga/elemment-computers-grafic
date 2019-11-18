import { Injectable } from '@angular/core';
import { DoubleNode } from './double-node';

@Injectable({
  providedIn: 'root',
})

export class Stack<T>{
  size: number;
  sup: DoubleNode<T>; 

  constructor(){
    this.sup = null;
    this.size = 0;
  }

  push(key:T){
    let new_node = new DoubleNode<T>(key);
    new_node.prev = this.sup;
    new_node.next = null;
    if(this.sup != null) this.sup.next = new_node;
    this.sup = new_node;       
    this.size++;
  }

  pop(){
    if(this.size == 0){
      console.error("Error!!. Empty Stack");
      return;
    } else{
      this.sup = this.sup.prev;
      this.sup.next = null;
      this.size--;
    }
  }

  top(){
    if(this.size != 0) return this.sup.key;
    else{
      console.error("Error!!. Empty Stack");
      return;
    } 
  }

  displayStack(){
    if(this.size == 0){
      console.error("Error!!. Empty Stack");
      return;
    } else{
      let node = this.sup;
      while(node != null){
        console.log(node.key);
        node = node. prev;
      }   
    }
  }
  
  clearStack(){
    this.sup = null;
    this.size = 0;
  }
}






/*export class DoubleLinkedList<T> {

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

}*/