export function renderProducts(products, el) {
  el.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>

      <div class="product-info">
        <h4 class="product-name">${p.name}</h4>

        <div class="product-footer">
          <span class="price">$${p.price}</span>
          <button class="add-btn" data-id="${p.id}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join("");
}
export function renderCart(cart, els) {
  els.cartItems.innerHTML = cart.length
    ? cart.map(i => `
        <div class="cart-row">
          <div class="cart-thumb">
            <img src="${i.image}" alt="${i.name}" />
          </div>

          <div class="cart-details">
            <p class="cart-name">${i.name}</p>
            <p class="cart-unit-price">$${i.price.toFixed(2)}</p>

            <div class="cart-actions">
              <div class="qty">
                <button data-id="${i.id}" data-act="dec">−</button>
                <span>${i.qty}</span>
                <button data-id="${i.id}" data-act="inc">+</button>
              </div>

              <button class="remove-btn" data-id="${i.id}" data-act="remove">
                🗑
              </button>
            </div>
          </div>

          <div class="cart-line-total">
            $${(i.price * i.qty).toFixed(2)}
          </div>
        </div>
      `).join("")
    : `<div class="empty-cart">
         <p>Your cart is empty</p>
         <small>Add items to get started</small>
       </div>`;

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  els.cartCount.textContent = count;
  els.itemCount.textContent = count;
  els.subtotal.textContent = subtotal.toFixed(2);
  els.total.textContent = (subtotal + 50).toFixed(2);
}
