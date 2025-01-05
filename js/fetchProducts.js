const API_URL = 'https://faceted-daily-timimus.glitch.me/'; 

async function fetchProducts(endpoint, containerId) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    const products = await response.json();

    console.log(products);  

    const container = document.getElementById(containerId);
    container.innerHTML = ''; 

    container.classList.add("product-container");

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add("product-card");

      const imageUrl = `images/${product.id}.jpg`; 

      console.log("Image URL:", imageUrl); 

      productCard.innerHTML = `
        <div class="product-image">
          <img src="${imageUrl}" alt="${product.title}" onerror="this.onerror=null; this.src='./images/default.jpg';">
        </div>
        <div class="product-details">
          <h3>${product.title}</h3>
          <p>Price: $${product.price}</p>
          <p>Rating: ${product.rating} ⭐</p>
          <p>Stock: ${product.stock}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
      container.appendChild(productCard);
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
function addToCart(productId, category) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ productId, category, quantity: 1 }); 
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Product added to cart!");
}
