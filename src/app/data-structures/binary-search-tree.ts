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

    find(key: T, root: TreeNode<T>){
        if(root.key = key){
            return root;
        }
        else if(root.key > key){
            if(root.left != null)
                return this.find(key, root.left);
            return root;
        }
        else if(root.key < key){
            if(root.right != null)
                return this.find(key, root.right);
            return root;
        }
    }
      

} 