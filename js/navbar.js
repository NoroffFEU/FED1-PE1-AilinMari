document.addEventListener("DOMContentLoaded", async () => {
    checkLoginStatus();
    const userName = await getAuthor();
    updateNavbar(userName);

function logOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
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
      // createAccountButton.addEventListener("click", logOut);
      
      // loginSection.innerHTML = `<h5>Logged in as ${userId}</h5><h6><a href="#" id="logout">Log out</a></h6>`;
      createAccount.addEventListener("click", logOut)
      createAccount.href = "#";
     
    } else {
      loginButton.innerHTML = `Log in to your account`;
      loginButton.href = "/account/login.html";
      createAccountButton.textContent = "Or register new account";
      createAccountButton.href = "/account/register.html";
    }
    loginSection.appendChild(loginButton);
    createAccount.appendChild(createAccountButton);

  
  }
  
  

  });
  