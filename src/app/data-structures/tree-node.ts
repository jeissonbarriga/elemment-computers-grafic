export class TreeNode<T> {

    key: T;
    parent: TreeNode<T>;
    left: TreeNode<T>;
    right: TreeNode<T>;

    constructor(key: T){
        this.key = key;
        this.left = null;
        this.right = null;
    }

}