const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootItem = null;
  }

  root() {
    return this.rootItem
  }

  add(data) {
    this.rootItem = addWithin(this.rootItem, data)

    function addWithin(node, data) {
      if(!node) {
        return new Node(data);
      }
      if(node.data === data) {
        return node;
      }
      if(data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchWithin(this.rootItem, data);

    function searchWithin(node, data) {
      if(!node) {
        return false;
      }

      if(node.data === data) {
        return true;
      }

      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data)
    }
  }

  find(data) {
    return searchWithin(this.rootItem, data);

    function searchWithin(node, data) {
      if(!node) {
        return node;
      }

      if(node.data === data) {
        return node;
      }

      return data < node.data ? searchWithin(node.left, data) : searchWithin(node.right, data)
    }
  }

  remove(data) {
    this.rootItem = removeNode(this.rootItem, data);

    function removeNode(node, data) {
      if(!node) {
        return null;
      }

      if(data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if(!node.left && !node.right) {
          return null;
        }

        if(!node.left) {
          node = node.right;
          return node;
        }

        if(!node.right) {
          node = node.right;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if(!this.rootItem) {
      return;
    }

    let node = this.rootItem
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if(!this.rootItem) {
      return;
    }

    let node = this.rootItem
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

const test = new BinarySearchTree()
test.add(8);
test.add(6);
test.add(9);
test.add(5);
test.add(10);
test.add(20);
test.add(2);
test.add(11);
console.log(test)

module.exports = {
  BinarySearchTree
};