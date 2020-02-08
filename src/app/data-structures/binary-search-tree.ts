import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';
import { Product } from './product';
import { DoubleLinkedList } from './double-linked-list';
import { Stack } from './stack';

@Injectable({
    providedIn: 'root',
})
export class BinarySearchTree<T> {

    root: TreeNode<T>;
    
    constructor(){
        this.root = null;
    }    
    
    isProduct(x: T | Product): x is Product {
        return typeof (x as Product).id === "number";
    } 

    find(key: T, root: TreeNode<T>){
        if(root == null) return root;
        if(this.isProduct(key) && this.isProduct(root.key)){
            if(root.key.id > key.id){
                if(root.left != null)
                    return this.find(key, root.left);
                return root;
            }else{
                if(root.right != null)
                    return this.find(key, root.right);
                return root;
            }
        }
    }

    insert(key: T){
        let parent = this.find(key, this.root);
        if(parent == null) this.root = new TreeNode<T>(key);
        else if(this.isProduct(key) && this.isProduct(parent.key)){
            if(parent.key.id > key.id){
                parent.left = new TreeNode<T>(key);
                parent.left.parent = parent;
            }
            else{
                parent.right = new TreeNode<T>(key);
                parent.right.parent = parent;
            }
        }
    }

    delete(node: TreeNode<T>){
        if(node.right == null){
            if(node.parent.right.key == node.key)
                node.parent.right = node.left;
            else if(node.parent.left.key == node.key)
                node.parent.left = node.left;
            node.left.parent = node.parent;
        }
        else{
            let nodeX = this.next(node);
            nodeX.parent.left = nodeX.right;
            let parentNodeX = nodeX.parent;
            nodeX.parent = node.parent;
            if(node.parent.key > node.key)
                node.parent.left = nodeX;
            else
                node.parent.right = nodeX;
            nodeX.left = node.left;
            nodeX.left.parent = nodeX;
            nodeX.right.parent = parentNodeX;
            nodeX.right = node.right;
            nodeX.right.parent = nodeX;
        }

    }

    display(){
        if(this.root == null){
            console.log("Empty Binary Search Tree");
        } else {
            console.log("The Binary Search Tree is:");
            let stack = new Stack<T>();
            stack.push(this.root.key);
            let myList = new DoubleLinkedList<T>();
            this.traverseInOrder(this.root, stack, myList);
            myList.displayList();
        }
    }

    resetTree(){
        this.root = null;
    }

    traverseInOrder(N: TreeNode<T>, stack: Stack<T>, list: DoubleLinkedList<T>){
        if(N.left != null){
            stack.push(N.left.key);
            this.traverseInOrder(N.left, stack, list);
        }

        list.pushBack(stack.top());
        stack.pop();
        
        if(N.right != null){
            stack.push(N.right.key);
            this.traverseInOrder(N.right, stack, list);
        }
        
        return list;
    }

    next(N: TreeNode<T>){
        if(N.right != null)
            return this.leftDescendant(N.right);
        else
            return this.rightAncestor(N);
    }

    leftDescendant(N: TreeNode<T>){
        if(N.left == null)
            return N
        else
            return this.leftDescendant(N.left);
    }

    rightAncestor(N: TreeNode<T>){
        if(N.key < N.parent.key)
            return N.parent
        else
            return this.rightAncestor(N.parent);
    }

    rangeSearch(x: T, y: T, root: TreeNode<T>){
        let list = new DoubleLinkedList<T>();
        let itNode = this.find(x, root);
        while(itNode.key <= y){
            if(itNode.key >= x)
                list.pushBack(itNode.key);
                itNode = this.next(itNode);
        }
        return list;
    }
} 