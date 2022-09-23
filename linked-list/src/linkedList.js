/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  #HEAD = null;

  #TAIL = null;

  #SIZE = 0;

  get head() {
    return this.#HEAD;
  }

  get tail() {
    return this.#TAIL;
  }

  get size() {
    return this.#SIZE;
  }

  at(index) {
    const { head, size } = this;
    const ndx = index < 0 ? size - -index : index;
    let node = head;

    if (ndx > size || ndx < 0) return null;

    for (let i = 0; i < size; i += 1) {
      if (node && i === ndx) {
        return node;
      }

      node = node?.next;
    }

    return null;
  }

  removeAt(index) {
    const { size } = this;
    const ndx = index < 0 ? size - -index : index;

    if (ndx < 0 || ndx > size) return null;

    const node = this.at(ndx - 1);

    if (node) {
      const nexted = node?.next?.next;
      node.next = nexted;

      if (ndx === size - 1) {
        this.#TAIL = node;
      }
    }

    if (size > 0) {
      this.#SIZE -= 1;
    } else {
      this.#SIZE = 0;
    }

    return node;
  }

  insertAt(value, index) {
    const { size } = this;
    const ndx = index < 0 ? size - -index + 1 : index;

    if (ndx < 0 || ndx > size) return null;

    const node = this.at(ndx - 1);
    const newNode = new Node(value);
    const prev = node.next;

    node.next = newNode;
    newNode.next = prev;

    this.#SIZE += 1;

    return newNode;
  }

  append(value) {
    const { head, tail } = this;
    const node = new Node(value);

    if (!head) {
      this.#HEAD = node;
      this.#SIZE = 1;
    } else {
      if (!tail) {
        head.next = node;
      } else {
        tail.next = node;
      }

      this.#TAIL = node;
      this.#SIZE += 1;
    }
  }

  prepend(value) {
    const { head, size } = this;
    const node = new Node(value);

    node.next = head;

    this.#HEAD = node;
    if (size < 0) {
      this.#SIZE = 1;
    } else {
      this.#SIZE += 1;
    }
  }

  pop() {
    const { head, tail, size } = this;
    const prevNode = this.at(-2);

    if (prevNode) {
      prevNode.next = null;
      this.#TAIL = prevNode;
    } else if (tail) {
      head.next = null;
      this.#TAIL = null;
    } else if (head) {
      this.#HEAD = null;
    }

    if (size > 0) {
      this.#SIZE -= 1;
    } else {
      this.#SIZE = 0;
    }
  }

  find(value) {
    const { head, size } = this;
    let node = head;

    for (let i = 0; i < size; i += 1) {
      if (node?.value === value) {
        return i;
      }

      node = node.next;
    }

    return null;
  }

  contains(value) {
    const index = this.find(value);

    return index !== null;
  }

  toString() {
    const { size } = this;
    let node = this.head;
    let str = 'Visualizer: ';

    for (let i = 0; i < size; i += 1) {
      if (node) {
        str += `( ${node.value} ) -> `;
      }

      node = node?.next;
    }
    str += 'null';

    console.log(str);

    return str;
  }
}

const linkedList = new LinkedList();

linkedList.toString();
linkedList.append(5);
linkedList.append(6);
linkedList.append(7);
linkedList.append(8);
linkedList.append(9);
linkedList.append(10);
linkedList.toString();
linkedList.prepend(4);
linkedList.prepend(3);
linkedList.prepend(2);
linkedList.prepend(1);
linkedList.prepend(0);
linkedList.toString();
console.log(
  `Find - [-5]: ${linkedList.find(-5)}`,
  `\nFind - [0]: ${linkedList.find(0)}`,
  `\nFind - [5]: ${linkedList.find(5)}`,
  `\nFind - [10]: ${linkedList.find(10)}`,
  `\nFind - [15]: ${linkedList.find(15)}`,
  `\nContains [-5]: ${linkedList.contains(-5)}`,
  `\nContains [0]: ${linkedList.contains(0)}`,
  `\nContains [5]: ${linkedList.contains(5)}`,
  `\nContains [10]: ${linkedList.contains(10)}`,
  `\nContains [15]: ${linkedList.contains(15)}`,
  `\nAt [-5]: ${linkedList.at(-5)?.value}`,
  `\nAt [0]: ${linkedList.at(0)?.value}`,
  `\nAt [5]: ${linkedList.at(5)?.value}`,
  `\nAt [10]: ${linkedList.at(10)?.value}`,
  `\nAt [15]: ${linkedList.at(15)?.value}`,
);
linkedList.pop();
linkedList.pop();
linkedList.pop();
linkedList.toString();
linkedList.removeAt(2);
linkedList.removeAt(-1);
linkedList.removeAt(-3);
linkedList.toString();
linkedList.insertAt(2, 2);
linkedList.insertAt(4, 4);
linkedList.insertAt(7, -1);
linkedList.toString();
