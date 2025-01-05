function addToCart(productId) {
    // Select the product card using the product ID
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!productCard) {
      alert("Product not found!");
      return;
    }
  
    // Get the product details from the DOM
    const title = productCard.querySelector("h3").textContent || "Unnamed Product";
    const priceText = productCard.querySelector("p:nth-of-type(1)").textContent; // First p tag for price
    const price = parseFloat(priceText.split("$")[1]) || 0;
    const ratingText = productCard.querySelector("p:nth-of-type(2)").textContent; // Second p tag for rating
    const rating = parseFloat(ratingText.split(": ")[1]) || "Not rated";
    const stockText = productCard.querySelector("p:nth-of-type(3)").textContent; // Third p tag for stock
    const stock = parseInt(stockText.split(": ")[1]) || 0;
  
    // Retrieve the cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.productId === productId);
  
    if (existingProduct) {
      if (existingProduct.quantity < stock) {
        existingProduct.quantity += 1;
      } else {
        alert("Cannot add more than available stock!");
        return;
      }
    } else {
      cart.push({
        productId,
        title,
        price,
        stock,
        rating,
        quantity: 1,
      });
    }
  
    // Save the cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
  }
  








  function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);
  
    if (existingProduct) {
      // Increase quantity if the product already exists in the cart
      existingProduct.quantity++;
    } else {
      // Add the product to the cart with default quantity = 1
      cart.push({
        id: product.id,
        title: product.title || 'Unnamed Product',
        price: product.price || 0,
        stock: product.stock || 0,
        rating: product.rating || 'Not rated',
        image: product.image || './images/default-placeholder.png',
        quantity: 1
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
  }
  