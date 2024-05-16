document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const backendUrl = 'https://your-render-backend-url.onrender.com'; // Replace with your Render backend URL

  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const credentials = {
      username,
      password
    };

    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful');
        // Redirect to the main page or dashboard
        window.location.href = 'main.html'; // Replace with your main page URL
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
