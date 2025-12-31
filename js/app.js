import { products } from "./data.js";
import { Store } from "./store.js";
import { renderProducts, renderCart } from "./ui.js";

const store = new Store();

const els = {
  products: document.getElementById("products"),
  cartItems: document.getElementById("cartItems"),
  cartCount: document.getElementById("cartCount"),
  itemCount: document.getElementById("itemCount"),
  subtotal: document.getElementById("subtotal"),
  total: document.getElementById("total")
};

// render products
renderProducts(products, els.products);

// subscribe cart updates
store.subscribe(cart => renderCart(cart, els));

// add to cart
els.products.onclick = e => {
  if (e.target.tagName === "BUTTON") {
    const id = +e.target.dataset.id;
    store.add(products.find(p => p.id === id));
  }
};

// update qty
els.cartItems.onclick = e => {
  const id = +e.target.dataset.id;
  const act = e.target.dataset.act;

  if (!id || !act) return;

  if (act === "inc") store.update(id, 1);
  if (act === "dec") store.update(id, -1);

  //  DELETE ITEM
  if (act === "remove") {
    store.update(id, -Infinity);
  }
};


// cart toggle
const cartPanel = document.getElementById("cartPanel");
document.getElementById("cartToggle").onclick =
  () => cartPanel.classList.toggle("hidden");

document.getElementById("closeCart").onclick =
  () => cartPanel.classList.add("hidden");
