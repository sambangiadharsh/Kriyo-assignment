export class Store {
  constructor() {
    this.cart = [];
    this.listeners = [];
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.cart));
  }

  add(product) {
    const item = this.cart.find(i => i.id === product.id);
    item ? item.qty++ : this.cart.push({ ...product, qty: 1 });
    this.notify();
  }

  update(id, delta) {
    this.cart = this.cart
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0);
    this.notify();
  }
}
