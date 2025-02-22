document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login");

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();

    let emailField = document.getElementById("email").value; // get email from field on webpage
    let passwordField = document.getElementById("password").value; // get password from field on webpage
    console.log(emailField, passwordField);
    const url = "https://v2.api.noroff.dev/auth/login";
    const data = {
      email: emailField,
      password: passwordField,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      console.log("RESPONSE:", response);

      const result = await response.json();
      const accessToken = result.data.accessToken;
      const userId = result.data.name; // Assuming userId is part of the response
      console.log(result);

      console.log(accessToken);
      const loginString = JSON.stringify(result);
      localStorage.setItem("result", loginString);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", userId);

      // Refresh the site after successful login
      window.location.href = `../index.html`;
    } catch (error) {
      console.log("Error:", error);
      // Display error message to user
      const loginFailed = document.querySelector(".loginFailed");
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Login failed. Please check your email and password, and try again.";
      errorMessage.style.color = "red";
      loginFailed.appendChild(errorMessage);
    }
  });

  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");
  if (storedEmail && storedPassword) {
    document.getElementById("email").value = storedEmail;
    document.getElementById("password").value = storedPassword;
    document.getElementById("remember").checked = true;
  }
});
