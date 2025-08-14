import { Tree } from './tree.js'

function randomNumArray(length) {
  let array = [];

  for(let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

let array = randomNumArray(20);

console.log("Input array: " + array + "\n");

let tree = new Tree(array);

tree.prettyPrint(tree.root);

console.log("Is it balanced?: " + tree.isBalanced());

let levelOrder = [];

tree.levelOrderForEach((item) => {
  levelOrder.push(item.data);
});

console.log("Level-order: " + levelOrder);

let preOrder = [];

tree.preOrderForEach((item) => {
  preOrder.push(item.data);
});

console.log("Pre-order: " + preOrder);

let postOrder = [];

tree.postOrderForEach((item) => {
  postOrder.push(item.data);
});

console.log("Post-order: " + postOrder);

let inOrder = [];

tree.inOrderForEach((item) => {
  inOrder.push(item.data);
});

console.log("In-order: " + inOrder);

let array2 = randomNumArray(10);

console.log("\nSecond input: " + array2);

array2.forEach((item) => {
  tree.insert(item);
});

tree.prettyPrint(tree.root);

console.log("Is it balanced?: " + tree.isBalanced());

tree.rebalance();

tree.prettyPrint(tree.root);

console.log("Is it balanced?: " + tree.isBalanced());

levelOrder = [];

tree.levelOrderForEach((item) => {
  levelOrder.push(item.data);
});

console.log("Level-order: " + levelOrder);

preOrder = [];

tree.preOrderForEach((item) => {
  preOrder.push(item.data);
});

console.log("Pre-order: " + preOrder);

postOrder = [];

tree.postOrderForEach((item) => {
  postOrder.push(item.data);
});

console.log("Post-order: " + postOrder);

inOrder = [];

tree.inOrderForEach((item) => {
  inOrder.push(item.data);
});

console.log("In-order: " + inOrder);