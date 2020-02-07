import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';

@Injectable({
    providedIn: 'root',
})
export class BinarySearchTree<T> {

    root: TreeNode<T>;
    
    constructor(){
        this.root = null;
    }   
      

}