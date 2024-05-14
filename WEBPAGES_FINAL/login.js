document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent form submission

  // Fetch form data
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Send a request to the server to verify credentials
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      // Redirect to the main webpage upon successful login
      window.location.href = "main.html";
    } else {
      // Display an error message if login fails
      const errorMessage = await response.text();
      alert(errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
});
