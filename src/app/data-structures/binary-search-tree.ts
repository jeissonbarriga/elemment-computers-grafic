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

    rotateRight(nodeX: TreeNode<T>){
        let parent = nodeX.parent;
        let nodeY = nodeX.left;
        let nodeB = nodeY.right;
        nodeY.parent = parent;

        //parent.appropiateChild = nodeY:
        if(parent != null && this.isProduct(parent.key) && this.isProduct(nodeX.key)){
            if(parent.key.id > nodeX.key.id)
                parent.left = nodeY;
            else if(parent.key.id < nodeX.key.id)
                parent.right = nodeY;
        }

        nodeX.parent = nodeY;
        nodeY.right = nodeX;
        nodeB.parent = nodeX;
        nodeX.left = nodeB;
    }

    rotateLeft(nodeY: TreeNode<T>){
        let parent = nodeY.parent;
        let nodeX = nodeY.right;
        let nodeB = nodeX.left;
        nodeX.parent = parent;

        //parent.appropiateChild = nodeX:
        if(parent != null && this.isProduct(parent.key) && this.isProduct(nodeY.key)){
            if(parent.key.id > nodeY.key.id)
                parent.left = nodeX;
            else if(parent.key.id < nodeY.key.id)
                parent.right = nodeX;
        }

        nodeY.parent = nodeX;
        nodeX.left = nodeY;
        nodeB.parent = nodeY;
        nodeY.right = nodeB;
    }

    rebalance(node : TreeNode<T>){
        let parent = node.parent;
        if(node.left.height > node.right.height + 1)
            this.rebalanceRight(node);
        if(node.right.height > node.left.height + 1)
            this.rebalanceLeft(node);
        this.adjustHeight(node);
        if(parent != null)
            this.rebalance(parent);
    }

    adjustHeight(node: TreeNode<T>){
        node.height = 1 + Math.max(node.left.height, node.right.height);
    }

    rebalanceRight(nodeN: TreeNode<T>){
        let nodeM = nodeN.left;
        if(nodeM.right.height > nodeM.left.height){
            this.rotateLeft(nodeM);
            let itNode = nodeM;
            while(itNode != null){
                this.adjustHeight(itNode);
                itNode = itNode.parent;
            }

        }
        this.rotateRight(nodeN);
        let itNode = nodeN;
        while(itNode != null){
            this.adjustHeight(itNode);
            itNode = itNode.parent;
        }
    }

    rebalanceLeft(nodeN: TreeNode<T>){
        let nodeM = nodeN.right;
        if(nodeM.left.height > nodeM.right.height){
            this.rotateRight(nodeM);
            let itNode = nodeM;
            while(itNode != null){
                this.adjustHeight(itNode);
                itNode = itNode.parent;
            }

        }
        this.rotateLeft(nodeN);
        let itNode = nodeN;
        while(itNode != null){
            this.adjustHeight(itNode);
            itNode = itNode.parent;
        }
    }

    AVLinsert(key: T){
       let node = this.insert(key); 
       if(node != null) this.rebalance(node);
    }

    insert(key: T): TreeNode<T>{
        let parent = this.find(key, this.root);
        if(parent == null){
            this.root = new TreeNode<T>(key);
            return parent;
        }
        else if(this.isProduct(key) && this.isProduct(parent.key)){
            if(parent.key.id == key.id){
                console.error("Product already inserted!");
                return null;
            }
            else if(parent.key.id > key.id){
                parent.left = new TreeNode<T>(key);
                parent.left.parent = parent;
                return parent;
            }
            else if (parent.key.id < key.id){
                parent.right = new TreeNode<T>(key);
                parent.right.parent = parent;
                return parent;
            }
        }
    }

    AVLdelete(node: TreeNode<T>){
        let nodeM = this.delete(node);
        this.rebalance(nodeM);
    }

    delete(node: TreeNode<T>): TreeNode<T>{
        if(node == null){
            console.error("Cannot delete node because it is null.");
            return null;
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
            return node.parent;
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
                return nodeXParent;
            }
            return node.parent;
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