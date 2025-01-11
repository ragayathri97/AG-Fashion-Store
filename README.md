# A&G E-Commerce Platform

A&G E-Commerce is a responsive and interactive e-commerce platform that allows users to explore a variety of products, add them to their cart, and manage their purchases seamlessly. The platform supports categories like Men, Women, Kids, and more, with features like coupons, stock validation, and cart updates.

## Features

- **Dynamic Product Display**: Fetch and display products dynamically from an API.
- **Interactive Cart Management**: Add, remove, and update product quantities in the cart with stock validation.
- **Category-Based Navigation**: Navigate through various product categories for a better user experience.
- **Coupon System**: Apply discount codes for savings.
- **Responsive Design**: Fully functional on desktops, tablets, and smartphones.
- **Local Storage Integration**: Save cart details locally to retain data between sessions.

---

## Technologies Used

- **HTML5, CSS3, JavaScript (ES6)**: Frontend development.
- **Local Storage**: Persistent cart management.
- **Fetch API**: For API interaction.
- **Custom CSS**: Responsive and user-friendly design.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ragayathri97/deployJsonUsingGlitch.git

2. Open `index.html` in your browser.

## How It Works

1. **Product Display**: 
    - The products are fetched from a remote API, and the product details (like price, rating, stock) are displayed in the cart.
2. **Cart Management**: 
    - The cart is stored in the browser’s `localStorage`, allowing the cart's state to persist even when the page is reloaded.
    - Users can increase or decrease product quantities in the cart, with stock limitations.
3. **Coupon Code**: 
    - Users can apply coupon codes for discounts (e.g., `NEWYEAR` for $50 off or `CODE2121` for $20 off). Invalid codes show an error message.
4. **Dynamic Updates**: 
    - Any changes in the cart are reflected in real-time, including price updates when quantities change.

## Functions

### `fetchProductDetails(productId, category)`
Fetches product details for a given product ID and category. Handles errors in case the product cannot be fetched.

### `displayCart()`
Displays the current cart contents, including product details, prices, and quantities.

### `updateOverallTotal()`
Calculates and updates the overall total price of the cart, including any applied discounts.

### `increaseQuantity(productId, stock)`
Increases the quantity of a product in the cart, ensuring it doesn't exceed available stock.

### `decreaseQuantity(productId)`
Decreases the quantity of a product in the cart, removing it if the quantity reaches zero.

### `applyCoupon()`
Applies a discount based on the provided coupon code, adjusting the overall total price.

### `removeItemFromCart(productId)`
Removes a product from the cart and updates the display.

## Usage

1. Add products to the cart by selecting them from the product list.
2. Increase or decrease product quantities within the cart.
3. Apply a coupon code to get a discount on the overall total.
4. View the updated total price after any changes.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.
   
