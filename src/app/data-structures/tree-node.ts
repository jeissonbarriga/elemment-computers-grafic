export class TreeNode<T> {

    key: T;
    height: number;
    parent: TreeNode<T>;
    left: TreeNode<T>;
    right: TreeNode<T>;

    constructor(key: T){
        this.key = key;
        this.height = 1;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

}