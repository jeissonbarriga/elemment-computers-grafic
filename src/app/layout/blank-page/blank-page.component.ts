import { Component, OnInit } from '@angular/core';
import { DoubleLinkedList } from 'src/app/data-structures/double-linked-list';
import { Product } from 'src/app/data-structures/product';
import { DynamicArray } from 'src/app/data-structures/dynamic-array';
import { Queue } from 'src/app/data-structures/queue';
import { Stack } from 'src/app/data-structures/stack';
import { BinarySearchTree } from 'src/app/data-structures/binary-search-tree';
import { TreeNode } from 'src/app/data-structures/tree-node';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
  posicion: number = 9000;

  ngOnInit() {

  }


  constructor(private list: DoubleLinkedList<Product>, private dArray: DynamicArray<Product>, private queue: Queue<Product>, private pila: Stack<Product>, private bst: BinarySearchTree<Product>) {

  }
  //BST
  insertBST(quantity: number, initial: number) {
    let t0 = performance.now();
  
    for (let i = initial; i < quantity+initial; i++) {
      let product = new Product(i, "Product" + i);
      this.bst.insert(product);
    }
  
    let t1 = performance.now();
  
    console.log("insert " + quantity + " products took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  deleteBST(){
    let t0 = performance.now();

    let itNode1 = this.bst.root;
    let itNode2 = this.bst.root;
    while(itNode1 != null){
      itNode2 = itNode1;
      itNode1 = this.bst.next(itNode1);
    }
    this.bst.delete(itNode2);
  
    let t1 = performance.now();
  
    console.log("Deleting 1 product took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  rangeSearchBST(initial: number, final: number){
    let t0 = performance.now();

    let productX = new Product(initial, "Product" + initial);
    let productY = new Product(final, "Product" + final);
    let list = this.bst.rangeSearch(productX, productY, this.bst.root);
  
    let t1 = performance.now();
    if(list.size != 0) list.displayList();
  
    console.log("range search between products " + initial + " and " + final + " found " + list.size + " products and it took: ");
    console.warn((t1 - t0) + " milliseconds");
  }

  nextBST(){
    let t0 = performance.now();

    let node1 = this.bst.root;
    let nextNode = this.bst.next(node1);
  
    let t1 = performance.now();
    console.log(nextNode.key);
  
    console.log("finding next product took: ");
    console.warn((t1 - t0) + " milliseconds");
  }
  
  printBST() {
    this.bst.display();
  }
  
  resetBST() {
    this.bst.resetTree();
    console.log("BST reseted");
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

  displayList(){
    this.list.displayList();
  }

}
