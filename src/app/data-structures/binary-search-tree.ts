import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';
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

    insert(key: T, root: TreeNode<T>){
        let parent = this.find(key, root);
        if(parent.key > key){
            parent.left = new TreeNode<T>(key);
            parent.left.parent = parent;
        }
        else{
            parent.right = new TreeNode<T>(key);
            parent.right.parent = parent;
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
            console.log("Empty BST");
        } else {
            let stack = new Stack<T>();
            stack.push(this.root.key);
            this.traverseInOrder(this.root, stack);
        }
    }

    traverseInOrder(N: TreeNode<T>, stack: Stack<T>){
        let itNode = N;
        if(N.left != null){
            stack.push(N.left.key);
            this.traverseInOrder(N.left, stack);
        }

        console.log(stack.top());
        stack.pop();
        
        if(N.right != null){
            stack.push(N.right.key);
            this.traverseInOrder(N.left, stack);
        }
        
/*
        while(stack.size != 0){
            if(itNode.left != null){
                stack.push(itNode.left.key);
                itNode = itNode.left;
            }else{
                console.log(stack.top());
                stack.pop();
                break;
            }
        }
        stack.push(N.key);

        if(N.right != null){
            stack.push(N.right.key);
        }*/
    }
} 