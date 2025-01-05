export const API_URL = "https://faceted-daily-timimus.glitch.me/";

// Populate Header
const headerContent = `
<div class='container'>
<div class="logo-header">
  <img src="./images/logo-ag.png" alt="logo-ag">
  </div>
      <nav>
      <ul>
        <li><a href='sale.html'>Sale</a> </li>
        <li><a href='men.html'>Men</a>
        <nav class="dropdown">
      <ul>
        <li><a href='tshirt.html'>T-shirt</a> </li>
        <li><a href='mjean.html'>Jeans</a></li>
        <li><a href='shirt.html'>Shirt</a></li>
        <li><a href='belts.html'>Belts</a></li>
      </ul></nav>
</li>
        <li><a href='ladies.html'>Ladies</a>
        <nav class="dropdown">
      <ul>
        <li><a href='w-dress.html'>W-Dress</a> </li>
        <li><a href='bags.html'>Bags</a></li>
        <li><a href='accessories.html'>Accessories</a></li>
      </ul>
    </nav>
        </li>
        <li><a href='kids.html'>Kids</a>
         <nav class="dropdown">
      <ul>
        <li><a href='kids-shirt.html'>Kids-Shirt</a> </li>
        <li><a href='kids-shorts.html'>Kids-Shorts</a></li>
        <li><a href='toys.html'>Toys</a></li>
      </ul>        
    </nav>
        </li>
          <div class="signin">
          <a href="about.html">About Us</a>
          <a href="contact-us.html">Contact Us</a>
          <a href="index.html">Sign In</a>
          </div>
        
      </ul>
    </nav>

  </div>
    <p class="welcome">Welcome, <span id="username-display"></span></p>
`;
document.getElementById('header').innerHTML = headerContent;

// Populate Footer
const footerContent = `
  <div class='container'>
  <div class="footer-list flex-element">
<nav class="fnav">
    <ul>
      <h3>shop</h3>
      <li><a href='sale.html'>Sale</a></li>
      <li><a href='men.html'>Men</a></li>
      <li><a href='ladies.html'>Ladies</a></li>
      <li><a href='kids.html'>Kids</a></li>
    </ul>
  </nav>

  <div class="logo">
  <img src="./images/logo-ag.png" alt="logo-ag">
  </div>

  <div class="corporate">
    <ul>
      <h3>Corporate Info</h3>
      <li><a href="about.html">About A&G group</a></li>
      <li><a href="sustainability.html">Sustainability A&GGroup</a></li>
      <li><a href="gallery.html">Gallery</a></li>
    </ul>
  </div>

</div>

  <p>&copy; 2024 A&G E-commerce. All Rights Reserved.</p>
</div>
`;
document.getElementById('footer').innerHTML = footerContent;

// Redirect to product details page when an item is clicked
function viewProduct(itemId, category) {
  window.location.href = `product.html?itemId=${itemId}&category=${category}`;
}

// Function to get query parameters from the URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to get URL parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
const username = getQueryParam('username'); // Get username from URL
if (username) {
  document.getElementById('username-display').textContent = username;
} else {
  document.getElementById('username-display').textContent = 'Guest';
}
