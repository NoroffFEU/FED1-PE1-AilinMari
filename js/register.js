import { BlogApi } from "./api-client.js";
let blogApi = new BlogApi();
document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.querySelector(".login");

  registerButton.addEventListener("click", async (event) => {
    event.preventDefault();

    let nameField = document.getElementById("name").value; 
    let emailField = document.getElementById("email").value; 
    let passwordField = document.getElementById("password").value; 
   
      try {
        await blogApi.register(nameField, emailField, passwordField);
      }
      catch (error) {
        // Display error message til bruker
        const registerFailed = document.querySelector(".registerFailed");
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Registration failed. Please check your details and try again.";
        errorMessage.style.color = "red";
        registerFailed.appendChild(errorMessage);
      }
      // Redirect to login page after successful registration
      window.location.href = "../account/login.html";
    } 
  );
});