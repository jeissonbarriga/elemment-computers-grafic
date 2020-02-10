import { Component, OnInit } from '@angular/core';
import { DoubleLinkedList } from 'src/app/data-structures/double-linked-list';
import { Product } from 'src/app/data-structures/product';
import { DynamicArray } from 'src/app/data-structures/dynamic-array';
import { Queue } from 'src/app/data-structures/queue';
import { Stack } from 'src/app/data-structures/stack';
import { HashMap } from 'src/app/data-structures/hash-map';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
  posicion: number = 9000;

  ngOnInit() {

  }


  constructor(private hashMap: HashMap, private list: DoubleLinkedList<Product>, private dArray: DynamicArray<Product>, private queue: Queue<Product>, private pila: Stack<Product>) {

  }

  hashSet() {
    this.hashMap.set('jeiss');
    this.hashMap.set('andres');
    this.hashMap.set('camilo');
    this.hashMap.set('oscar');
    this.hashMap.set('julian');
    this.hashMap.set('manuel');
  }

  //Queue
  qEnqueue(quantity: number) {
    let t0 = performance.now();

    for (let i = 0; i < quantity; i++) {
      let product = new Product(i, "Product" + i);
      this.queue.enqueue(product);
    }

    let t1 = performance.now();

    console.log("enqueue " + quantity + " products took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  qDequeue() {
    let t0 = performance.now();

    let eliminado = this.queue.dequeue();
    console.log("Dequeued: " + eliminado.name);

    let t1 = performance.now();

    console.log("dequeue 1 product took: ");
    console.warn((t1 - t0) + " milliseconds");

  }

  qIsEmpty() {
    this.queue.isEmpty();
  }

  qPrintQueue() {
    this.queue.displayQueue();
  }

  qresetQueue() {
    this.queue.clearQueue();
  }


  //Stack
  sPush(quantity: number){
    let t0 = performance.now();
    let id = this.pila.size;
    for (let i = 0; i < quantity; i++) {
      let product = new Product(id, "Product" + id);
      this.pila.push(product);
    }
    let t1 = performance.now();

    console.log("push " + quantity + " products took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  sPrintElements() {
    this.pila.displayStack();
  }

  sPop(){
    let t0 = performance.now();
    this.pila.pop();
    console.log("Salida último elemento");
    let t1 = performance.now();

    console.log("pop 1 product took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  sTop(){
    let t0 = performance.now();
    console.log("Top: " + this.pila.top().name);
    let t1 = performance.now();

    console.log("top 1 product took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  sClear(){
    this.pila.clearStack();
    console.log("Pila vacía");
  }
  

  //Dynamic Array
  dPushBack(quantity: number) {
    let t0 = performance.now();
    let id = this.dArray.getSize();
    for (let i = 0; i < quantity; i++) {
      let product = new Product(id, "Product" + id);
      this.dArray.pushBack(product);
    }
    let t1 = performance.now();

    console.log("push back " + quantity + " products took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  dGet() {
    let t0 = performance.now();
    console.log("Elemento Obtenido: " + this.dArray.get(1).name);
    let t1 = performance.now();

    console.log("get 1 product took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  dSet() {
    let t0 = performance.now();
    let producto = new Product(333, "Nuevito");
    console.log("Elemento Actualizado: " + this.dArray.set(1, producto));
    let t1 = performance.now();

    console.log("set 1 product took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  dRemove() {
    let t0 = performance.now();
    let eliminado = this.dArray.remove(this.posicion);
    if (eliminado) {
      console.log("Eliminado: " + eliminado.name);
    }
    let t1 = performance.now();

    console.log("remove 1 product took: ");
    console.warn((t1 - t0) + " milliseconds");

  }

  dPrintElements() {
    this.dArray.printElements();
  }

  dGetSize() {
    console.log("Size: " + this.dArray.getSize());
  }

  dGetCapacity() {
    console.log("Capacity: " + this.dArray.getCapacity());
  }


  //Doubly Linked List
  pushNodesFront(quantity: number) {

    let t0 = performance.now();
    for (let i = 0; i < quantity; i++) {
      let product = new Product(i, "Product" + i);
      this.list.pushFront(product);
    }
    let t1 = performance.now();

    console.log("push front " + quantity + " nodes took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  pushNodesBack(quantity: number) {

    let t0 = performance.now();
    for (let i = 0; i < quantity; i++) {
      let product = new Product(i, "Product" + i);
      this.list.pushBack(product);
    }
    let t1 = performance.now();

    console.log("push back" + quantity + " node took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  findByKey() {
    let t0 = performance.now();

    let product = new Product(1, "Product" + 1);
    let nodoEncontrado = this.list.findByKey(product);

    let t1 = performance.now();
    console.log(nodoEncontrado);

    console.log("find 1 node took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  popBack() {
    let t0 = performance.now();

    this.list.popBack();

    let t1 = performance.now();

    console.log("pop back 1 node took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  resetList() {
    this.list.clearList();
  }

}
