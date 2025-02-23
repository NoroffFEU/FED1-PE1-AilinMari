import { BlogApi } from "./api-client.js";
let blogApi = new BlogApi();
document.addEventListener("DOMContentLoaded", async () => {
  checkLoginStatus();
  // const userName = await getAuthor();
  // updateNavbar(userName);

  const hamburger = document.getElementById("hamburger-menu");
  const menu = document.getElementById("login-create");

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  function logOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("result");

    window.location.reload();
  }

  function checkLoginStatus() {
    const accessToken = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");
    const loginSection = document.querySelector(".log-in");
    const loginButton = document.createElement("a");
    const createAccount = document.querySelector(".create-account");
    const createAccountButton = document.createElement("a");

    if (accessToken && name) {
      loginSection.textContent = `Logged in as ${name}`;
      createAccount.textContent = "Log out";
      createAccount.addEventListener("click", logOut);
      createAccount.href = "#";
    } else {
      loginButton.innerHTML = `Log in to your account`;
      loginButton.href = "/FED1-PE1-AilinMari/account/login.html";
      createAccountButton.textContent = "Or register new account";
      createAccountButton.href = "/FED1-PE1-AilinMari/account/register.html";
    }
    loginSection.appendChild(loginButton);
    createAccount.appendChild(createAccountButton);
  }

});

const newPostButton = document.querySelector("#new-post");

const accessToken = localStorage.getItem("accessToken");
const name = localStorage.getItem("name");
if (!accessToken || name !== name) {
  newPostButton.style.display = "none";
}