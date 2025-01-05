let overallTotal = 0;

// Fetch product details from the appropriate API endpoint based on category
async function fetchProductDetails(productId, category) {
  try {
    const response = await fetch(`https://faceted-daily-timimus.glitch.me/${category}-products/${productId}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

// Display the cart items
async function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');
  overallTotal = 0; // Reset the overall total
  cartContainer.innerHTML = ''; // Clear existing cart content

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    updateOverallTotal();
    return;
  }

  for (const item of cart) {
    const category = item.category || 'men'; // Default to 'men' if no category is provided
    const product = await fetchProductDetails(item.productId, category);

    if (!product) continue;

    const { title = 'Unnamed Product', price = 0, stock = 0, rating = 'Not rated' } = product;
    const quantity = item.quantity || 1;
    const imageUrl = `images/${item.productId}.jpg`;
    const totalPrice = price * quantity;
    overallTotal += totalPrice;

    // Create cart item div dynamically
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.dataset.productId = item.productId;
    cartItemDiv.innerHTML = `
      <div class="cart-item-image">
        <img src="${imageUrl}" alt="${title}" onerror="this.onerror=null; this.src='./images/default.jpg';">
      </div>
      <div class="cart-item-details">
        <h3>${title}</h3>
        <p>Price: $${price.toFixed(2)}</p>
        <p>Stock: ${stock}</p>
        <p>Rating: ${rating}</p>
        <p>Quantity: 
          <button class="quantity-btn" onclick="decreaseQuantity(${item.productId})">-</button>
          <span class="quantity-value">${quantity}</span>
          <button class="quantity-btn" onclick="increaseQuantity(${item.productId}, ${stock})">+</button>
        </p>
        <p>Total: $${totalPrice.toFixed(2)}</p>
      </div>
    `;
    cartContainer.appendChild(cartItemDiv);
  }

  updateOverallTotal();
}

// Update the overall total in the DOM
function updateOverallTotal() {
  let overallTotalElement = document.getElementById('overall-total');
  if (!overallTotalElement) {
    overallTotalElement = document.createElement('div');
    overallTotalElement.id = 'overall-total';
    document.getElementById('cart-container').appendChild(overallTotalElement);
  }
  overallTotalElement.innerHTML = `<h2>Overall Total: $${overallTotal.toFixed(2)}</h2>`;
}

// Increase quantity and update the cart
function increaseQuantity(productId, stock) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(product => product.productId === productId);

  if (item && item.quantity < stock) {
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItem(productId);
  } else if (item && item.quantity >= stock) {
    alert('Out of stock!');
  }
}

// Decrease quantity and update the cart
function decreaseQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(product => product.productId === productId);

  if (item && item.quantity > 1) {
    item.quantity--;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItem(productId);
  } else if (item && item.quantity === 1) {
    removeItemFromCart(productId);
  }
}

// Update individual cart item in the DOM
async function updateCartItem(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(product => product.productId === productId);
  const category = item.category || 'men';
  const product = await fetchProductDetails(productId, category);

  if (!product) return;

  const { price = 0 } = product;
  const totalPrice = price * item.quantity;

  const cartItemDiv = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
  if (cartItemDiv) {
    cartItemDiv.querySelector('.quantity-value').textContent = item.quantity;
    cartItemDiv.querySelector('.cart-item-details p:last-of-type').textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Recalculate overall total
  overallTotal = cart.reduce((sum, product) => sum + product.quantity * price, 0);
  updateOverallTotal();
}

// Remove item from the cart
function removeItemFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Apply coupon logic
function applyCoupon() {
  const couponCode = document.getElementById('couponCode').value.trim();
  const discountMessage = document.getElementById('discountMessage');
  let discount = 0; // Initialize discount to 0

  // Apply discount based on the coupon code
  if (couponCode === 'NEWYEAR') {
    discount = 50; // Flat $50 discount
    overallTotal -= discount;
    discountMessage.textContent = `Coupon applied! You saved $${discount.toFixed(2)}.`;
  } else if (couponCode === 'CODE2121') {
    discount = 20; // Flat $20 discount
    overallTotal -= discount;
    discountMessage.textContent = `Coupon applied! You saved $${discount.toFixed(2)}.`;
  } else {
    discountMessage.textContent = 'Invalid coupon code.';
    return; // Exit the function if the coupon code is invalid
  }

  // Ensure the overall total does not drop below 0
  overallTotal = Math.max(overallTotal, 0);

  // Update the overall total in the DOM
  updateOverallTotal();
}

// Load the cart on page load
document.addEventListener('DOMContentLoaded', displayCart);
