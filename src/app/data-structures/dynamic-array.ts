import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicArray<T> {

  arr: Array<T>;
  capacity: number;
  size: number;

  constructor() {
    this.arr = new Array<T>(1);
    this.capacity = 1;
    this.size = 0;
  }

  get(i: number): T {
    if (i < 0 || i >= this.size) {
      console.error("Error!! Index out of range");
      return null;
    } else {
      return this.arr[i];
    }
  }

  set(i: number, val: T) {
    if (i < 0 || i >= this.size) {
      console.error("Error!! Index out of range");
    } else {
      this.arr[i] = val;
    }
  }

  pushBack(val: T) {
    if (this.size == this.capacity) {
      let arr2 = new Array(this.capacity * 2);//arreglo con el doble de capacidad
      for (let i = 0; i < this.arr.length; i++) {
        arr2[i] = this.arr[i];
      }
      this.arr = arr2;
      this.capacity *= 2;
    }
    this.arr[this.size] = val;
    this.size++;
  }

  remove(i: number): T {
    if (i < 0 || i >= this.size) {
      console.error("Error!! Index out of range");
      return null;
    } else {
      let val = this.arr[i];
      for (let j = i; j < (this.size - 1); j++) {
        this.arr[j] = this.arr[j + 1];
      }
      this.arr[this.size - 1] = null;
      this.size--;
      return val;
    }
  }

  getSize(): number {
    return this.size;
  }

  getCapacity(): number {
    return this.capacity;
  }

  printElements() {
    for (let i = 0; i < this.arr.length; i++) {
      console.log(this.arr[i]);
    }
  }

}