import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';
import { Product } from './product';
import { DoubleLinkedList } from './double-linked-list';
import { Stack } from './stack';
import { ThemeService } from 'ng2-charts';
import { IfStmt } from '@angular/compiler';

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
            if(root.key.id == key.id)
                return root;
            else if(root.key.id > key.id){
                if(root.left != null)
                    return this.find(key, root.left);
                return root;
            }else if(root.key.id < key.id){
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
            if(parent.key.id == key.id)
                console.error("Product already inserted!");
            else if(parent.key.id > key.id){
                parent.left = new TreeNode<T>(key);
                parent.left.parent = parent;
            }
            else if (parent.key.id < key.id){
                parent.right = new TreeNode<T>(key);
                parent.right.parent = parent;
            }
        }
    }

    delete(node: TreeNode<T>){
        if(node == null){
            console.error("Cannot delete node because it is null.");
            return;
        }

        if(node.right == null){
            if(node == this.root && node.parent == null)
                this.root = node.left;
            else if(node.parent.right != null && this.isProduct(node.parent.right.key) && this.isProduct(node.key))
                if(node.parent.right.key.id == node.key.id)
                    node.parent.right = node.left;
            else if(node.parent.left != null && this.isProduct(node.parent.left.key) && this.isProduct(node.key))
                if(node.parent.left.key.id == node.key.id)
                    node.parent.left = node.left;

            if(node.left != null) node.left.parent = node.parent;
        }else{
            let nodeX = this.next(node);
            let nodeXRight = nodeX.right;
            let nodeXParent = nodeX.parent;
            
            //Replace node by X:
            nodeX.parent = node.parent;
            if(node.parent != null && this.isProduct(node.parent.key) && this.isProduct(node.key)){
                if(node.parent.key.id > node.key.id)
                    node.parent.left = nodeX;
                else if(node.parent.key.id < node.key.id)
                    node.parent.right = nodeX;
            }
            nodeX.left = node.left;
            if(nodeX.left != null) nodeX.left.parent = nodeX;
            
            if(nodeX != node.right){
                nodeX.right = node.right;
                if(nodeX.right != null) nodeX.right.parent = nodeX;

                //Promote X.right:
                if(nodeXRight != null) nodeXRight.parent = nodeXParent;
                nodeXParent.left = nodeXRight;
            }
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
        if(N != null){
            if(N.right != null)
                return this.leftDescendant(N.right);
            else
                return this.rightAncestor(N);
        }
        return N;
    }

    leftDescendant(N: TreeNode<T>){
        if(N != null){
            if(N.left == null)
                return N;
            else
                return this.leftDescendant(N.left);
        }
        return N;
    }

    rightAncestor(N: TreeNode<T>){
        if(N != null && N.parent != null){
            if(this.isProduct(N.key) && this.isProduct(N.parent.key)){
                if(N.key.id < N.parent.key.id)
                    return N.parent;
                else
                    return this.rightAncestor(N.parent);
            }
        }
        return null;
    }

    rangeSearch(initial: T, final: T, root: TreeNode<T>){
        let list = new DoubleLinkedList<T>();
        let itNode = this.find(initial, root);
        if(itNode == null)
            return list;
        if(this.isProduct(itNode.key) && this.isProduct(initial) && this.isProduct(final)){
            while(itNode.key.id <= final.id){
                if(itNode.key.id >= initial.id)                      
                    list.pushBack(itNode.key);

                if(this.next(itNode) != null)
                    itNode = this.next(itNode);
                else return list;
            }
        }
        return list;
    }

    resetTree(){
        this.root = null;
    }
} 