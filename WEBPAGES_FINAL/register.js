document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const backendUrl = 'https://your-render-backend-url.onrender.com'; // Replace with your Render backend URL

  registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = {
      name,
      email,
      username,
      password
    };

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('User registered successfully');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
