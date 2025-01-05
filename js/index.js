const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

const API_BASE_URL = "https://faceted-daily-timimus.glitch.me/"; 

// Show Login Form After Signup
signupBtn.addEventListener('click', async () => {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const user = { username, email, password };

  try {
    // Check if user already exists
    const existingUsers = await fetch(`${API_BASE_URL}/users`).then(res => res.json());
    if (existingUsers.some(u => u.email === email)) {
      alert('User already exists. Please login.');
      signupForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      return;
    }

    // Add new user
    await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    alert('Signup successful! Please login.');
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  } catch (error) {
    console.error('Error during signup:', error);
    alert('Signup failed. Please try again.');
  }
});

loginBtn.addEventListener('click', async () => {
const email = document.getElementById('login-email').value;
const password = document.getElementById('login-password').value;

try {
const users = await fetch(`${API_BASE_URL}/users`).then(res => res.json());
const user = users.find(u => u.email === email && u.password === password);

if (user) {
  await fetch(`${API_BASE_URL}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: user.id, username: user.username }),
  });

  alert('Login successful!');
  // Redirect with username as query parameter
  window.location.href = `sale.html?username=${encodeURIComponent(user.username)}`;
} else {
  alert('Invalid email or password. Try again.');
}
} catch (error) {
console.error('Error during login:', error);
alert('Login failed. Please try again.');
}
});