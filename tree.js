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

let tree = new Tree([10, 20, 30, 100, 500]);

tree.insert(15);

tree.prettyPrint(tree.root);