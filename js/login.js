import { BlogApi } from "./api-client.js";
let blogApi = new BlogApi();

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login");

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();

    let emailField = document.getElementById("email").value; // get email from field on webpage
    let passwordField = document.getElementById("password").value; // get password from field on webpage
    try {
      const data = await blogApi.login(emailField, passwordField);
      const accessToken = data.accessToken;
      const userId = data.name; // Assuming userId is part of the response
      const loginString = JSON.stringify(data);
      localStorage.setItem("result", loginString);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", userId);

      // Refresh the site after successful login
      window.location.href = `../index.html`;
    } catch (error) {
      const loginFailed = document.querySelector(".loginFailed");
      const errorMessage = document.createElement("p");
      errorMessage.textContent =
        "Login failed. Please check your email and password, and try again.";
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
