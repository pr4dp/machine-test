class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.head = null;
    this.tail = null;
  }

  get(key) {
    if (this.cache[key]) {
      this.moveToFront(key);
      return this.cache[key].val;
    }
    return null;
  }

  put(key, val) {
    if (Object.keys(this.cache).length === this.capacity) {
      // if cache is full then remove last item
      this.removeLast();
    }
    this.addToFront(key, val);
  }

  addToFront(key, val) {
    const newNode = { key, val, next: null };
    if (!this.head) {
      // if there is no head
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.cache[key] = newNode;
  }

  moveToFront(key) {
    const current = this.cache[key];
    if (current === this.head) return;

    let prev = null;
    let node = this.head;
    while (node && node.key !== key) {
      prev = node;
      node = node.next;
    }
    if (!node) return;
    if (node === this.tail) {
      this.tail = prev;
    }

    if (prev) {
      prev.next = node.next;
    }

    node.next = this.head;
    this.head = node;
  }

  removeLast() {
    if (!this.head) return;
    const lastKey = this.tail.key;
    delete this.cache[lastKey];

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next;
      }

      current.next = null;
      this.tail = current;
    }
  }
}

export default LRUCache;
