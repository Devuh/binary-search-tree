import { Node } from './node.js'

class Tree {
  constructor(array) {
    this.array = this.sortAndRemoveDupes(array);
    this.root = this.buildTree(this.array);
  }

  sortAndRemoveDupes(array) {
    array.sort((a, b) => {
      return a - b;
    });

    return array.filter((a, index, array) => {
      return a != array[index + 1];
    });
  }

  buildTree(array) {
    let start = 0;
    let end = array.length - 1;
    let mid = Math.floor((start + end) / 2);

    let root = new Node(array[mid]);

    if(mid !== 0) {
      root.left = this.buildTree(array.slice(start, mid));
    }
    if(mid !== end) {
      root.right = this.buildTree(array.slice(mid + 1, end + 1));
    }

    return root;
  }

  insert(value, root = this.root) { // 
    if(!root) return new Node(value);

    if(root.data > value) root.left = this.insert(value, root.left);
    if(root.data < value) root.right = this.insert(value, root.right);

    return root;
  }

  deleteItem(value, root = this.root) { // Currently can only delete node with 1 or less children
    if(!root) return null;

    if(root.data > value) root.left = this.deleteItem(value, root.left); // Traverse the tree
    if(root.data < value) root.right = this.deleteItem(value, root.right);

    if(root.data === value && !root.left && !root.right) return null; // Delete if it is a leaf node

    if(root.data === value && root.right && !root.left) return root.right; // Delete if it has a single left or right child;
    if(root.data === value && root.left && !root.right) return root.left;

    if(root.data === value && root.right && root.left) { // Delete if it has a right AND left child
      let successor = root.right;
      while(successor.left) {
        successor = successor.left;
      }
      this.deleteItem(successor.data);
      root.data = successor.data;
    }
    
    return root;
  }

  find(value) {
    let root = this.root;

    while(root) {
      if(root.data === value) {
        return root;
      } else if(!root.left && !root.right) {
        return null;
      }
      if(root.data > value) root = root.left;
      if(root.data < value) root = root.right;
    }
  }

  levelOrderForEach(callback) {
    if(!callback) throw new Error("Callback function must be provided to levelOrderForEach()");

    let array = [this.root];

    while(array[0] != undefined) {
      let current = array[0];
      callback(current);

      if(current.left) array.push(current.left);
      if(current.right) array.push(current.right);
      array = array.slice(1);
    }
  }

  inOrderForEach(callback, root = this.root) {
    if(!callback) throw new Error("Callback function must be provided to inOrderForEach()");

    if(root === null) return;
    this.inOrderForEach(callback, root.left);
    callback(root);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root = this.root) {
    if(!callback) throw new Error("Callback function must be provided to preOrderForEach()");

    if(root === null) return;
    callback(root);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if(!callback) throw new Error("Callback function must be provided to postOrderForEach()");

    if(root === null) return;
    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root);
  }

  height(value) {
    let currentHeight = 0;
    let branchHeight = 0;
    let longestHeight = 0;
    let root = this.find(value);

    if(root === null) return null;

    this.preOrderForEach((node) => {
      if(node.left && node.right) {
        branchHeight = currentHeight;
      }
      if(!node.left && !node.right) {
        longestHeight = Math.max(currentHeight, longestHeight);
        currentHeight = branchHeight;
        branchHeight--;
      }
      currentHeight++;
    }, root);

    return longestHeight;
  }

  depth(value) {
    let root = this.root;
    let depth = 0;

    while(root) {
      if(root.data === value) {
        return depth;
      } else if (!root.left && !root.right) {
        return null;
      }
      if(root.data > value) {
        root = root.left;
        depth++;
      }
      if(root.data < value) {
        root = root.right;
        depth++;
      }
    }
  }

  isBalanced(root = this.root) {
    if(root === null) return true;

    let left = 0;
    let right = 0;

    if(root.left) left = this.height(root.left.data);
    if(root.right) right = this.height(root.right.data);

    if(Math.abs(left - right) > 1) return false;

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    let array = [];

    this.preOrderForEach((item) => {
      array.push(item.data);
    });
    
    array = this.sortAndRemoveDupes(array);

    this.root = this.buildTree(array);
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

// let tree = new Tree([10, 20, 30, 100, 500]);

// tree.insert(7);
// tree.insert(15);
// tree.insert(18);
// tree.insert(50);

// tree.deleteItem(20);

// tree.preOrderForEach((item) => {
//   console.log(item.data);
// });

// tree.insert(20);

// console.log(tree.isBalanced());

// tree.prettyPrint(tree.root);

// tree.rebalance();

// tree.prettyPrint(tree.root);

// console.log(tree.isBalanced());

export { Tree }