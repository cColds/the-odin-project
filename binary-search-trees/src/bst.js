/* eslint-disable max-classes-per-file */

class TreeNode {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#preBuild(array);
  }

  #preBuild(array) {
    const sorted = array.sort((a, b) => a - b);
    const setted = new Set(sorted);

    return this.#buildTree([...setted]);
  }

  #buildTree(
    array,
    from = 0,
    to = array.length - 1,
  ) {
    if (from > to) return null;

    const midIndx = Math.floor((from + to) / 2);
    const root = new TreeNode(array[midIndx]);

    root.left = this.#buildTree(array, from, midIndx - 1);
    root.right = this.#buildTree(array, midIndx + 1, to);

    return root;
  }

  /* eslint-disable no-param-reassign */
  #inserData(data, root = this.root) {
    if (!root) {
      return new TreeNode(data);
    }

    if (data < root.data) {
      root.left = this.#inserData(data, root.left);
    } else if (data > root.data) {
      root.right = this.#inserData(data, root.right);
    }

    return root;
  }

  #deleteData(data, root = this.root) {
    if (!root) return null;

    if (data < root.data) {
      root.left = this.#deleteData(data, root.left);
    } else if (data > root.data) {
      root.right = this.#deleteData(data, root.right);
    } else {
      if (!root.left) {
        return root.right;
      }

      if (!root.right) {
        return root.left;
      }

      root.data = this.min(root.right);
      root.right = this.#deleteData(root.data, root.right);
    }

    return root;
  }

  #order(callback, type, list = [], node = this.root) {
    if (!node) return null;

    if (type === 'pre') {
      if (callback) {
        callback(node);
      } else {
        list.push(node.data);
      }
    }

    if (node.left) {
      this.#order(callback, type, list, node.left);
    }

    if (type === 'in') {
      if (callback) {
        callback(node);
      } else {
        list.push(node.data);
      }
    }

    if (node.right) {
      this.#order(callback, type, list, node.right);
    }

    if (type === 'post') {
      if (callback) {
        callback(node);
      } else {
        list.push(node.data);
      }
    }

    if (!callback) return list;

    return true;
  }
  /* eslint-enable no-param-reassign */

  insert(data) {
    this.root = this.#inserData(data);
  }

  delete(data) {
    this.root = this.#deleteData(data);
  }

  find(data) {
    let { root } = this;

    while (root) {
      if (root.data === data) return root;

      if (data < root.data) {
        root = root.left;
      } else if (data > root.data) {
        root = root.right;
      }
    }

    return null;
  }

  levelOrder(callback) {
    const queue = [this.root];
    const array = [];

    while (queue.length > 0) {
      const node = queue.shift();

      if (callback) {
        callback(node);
      } else {
        array.push(node.data);
      }

      queue.push(
        ...[
          node?.left,
          node?.right,
        ].filter((data) => data),
      );
    }

    if (!callback) return array;

    return true;
  }

  preorder(callback) {
    return this.#order(callback, 'pre');
  }

  inorder(callback) {
    return this.#order(callback, 'in');
  }

  postorder(callback) {
    return this.#order(callback, 'post');
  }

  height(root = this.root) {
    if (!root) return -1;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root) {
    let depth = -1;

    if (!node || !root) return depth;
    if (node === root) return depth + 1;

    const leftDepth = this.depth(node, root.left);
    const rightDepth = this.depth(node, root.right);

    if (leftDepth >= 0) {
      depth = leftDepth + 1;
    }

    if (rightDepth >= 0) {
      depth = rightDepth + 1;
    }

    return depth;
  }

  isBalanced(root = this.root) {
    if (!root) return false;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return true;
    }

    return true;
  }

  rebalance() {
    const array = this.inorder();

    this.root = this.#preBuild(array);
  }

  /* eslint-disable no-param-reassign */
  min(root = this.root) {
    let minData = root.data;

    while (root.left) {
      minData = root.left.data;
      root = root.left;
    }

    return minData;
  }
  /* eslint-enable no-param-reassign */

  print(node = this.root, prefix = '', isLeft = true) {
    if (node.right !== null) {
      this.print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
