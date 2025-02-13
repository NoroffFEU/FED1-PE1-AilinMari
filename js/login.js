document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login");
  // let login = localStorage.getItem("userId");

  
document.addEventListener("DOMContentLoaded", async () => {
  checkLoginStatus();
  const userName = await getAuthor();
  updateNavbar(userName);
});


// function logOut() {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("userId");
//   window.location.reload();
// }

// function checkLoginStatus() {
//   const accessToken = localStorage.getItem("accessToken");
//   const userId = localStorage.getItem("userId");
//   const loginSection = document.querySelector(".log-in");
//   const loginButton = document.createElement("a");
//   const createAccount = document.querySelector(".create-account");
//   const createAccountButton = document.createElement("a");

//   if (accessToken && userId) {

//     loginSection.textContent = `Logged in as ${userId}`;
//     // loginSection.innerHTML = `<h5>Logged in as ${userId}</h5><h6><a href="#" id="logout">Log out</a></h6>`;
//     document.getElementsByClassName("create-account").addEventListener("click", logOut);
//   } else {
//     loginButton.innerHTML = `Log in to your account`;
//     loginButton.href = "/account/login.html";
//     createAccountButton.textContent = "Or create account";
//     createAccountButton.href = "/account/register.html";
//   }
//   loginSection.appendChild(loginButton);
//   createAccount.appendChild(createAccountButton);
// }



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
      const userId = result.data.userId; // Assuming userId is part of the response
      console.log(result);

      console.log(accessToken);
      const loginString = JSON.stringify(result);
      // console.log("Login successful:", result);
      localStorage.setItem("result", loginString);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      let rememberMe = document.getElementById("remember").checked;
      if (rememberMe) {
        localStorage.setItem("email", emailField);
        localStorage.setItem("password", passwordField);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      const author = await getAuthor();
      updateNavbar(author);
      checkLoginStatus(); // Update the navbar after login
    } catch (error) {
      console.log("Error:", error);
      // Handle login error here (e.g., show error message to user)
    }
  });

  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");
  if (storedEmail && storedPassword) {
    document.getElementById("email").value = storedEmail;
    document.getElementById("password").value = storedPassword;
    document.getElementById("rememberMe").checked = true;
  }
});


// function updateNavbar(author) {
//   const navbarLogin = document.querySelector(".log-in");
//   const loginButtonNavbar = document.createElement("a");
//   const navbarCreate = document.querySelector(".create-account");
//   const createAccount = document.createElement("a");

//   if (author) {
//     loginButtonNavbar.textContent = `Logged in as ${author.name}`;
//     createAccount.textContent = "Log out";
//     createAccount.href = "#";
//     createAccount.addEventListener("click", logOut);
//   } else {
//     loginButtonNavbar.textContent = "Log in to your account";
//     loginButtonNavbar.href = "/login.html";
//     createAccount.textContent = "Or create account";
//     createAccount.href = "/account/register.html";
//   }

//   navbarLogin.innerHTML = "";
//   navbarCreate.innerHTML = "";
//   navbarLogin.appendChild(loginButtonNavbar);
//   navbarCreate.appendChild(createAccount);
// }

// async function getAuthor() {
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) return null;

//   try {
//     const response = await fetch("https://v2.api.noroff.dev/blog/posts/", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (!response.ok) throw new Error("Failed to fetch author");
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching author", error);
//     return null;
//   }
// }

// function logOut() {
//   localStorage.removeItem("accessToken");
//   window.location.reload();
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const rememberMe = document.querySelector(".checkbox");
//   rememberMe.addEventListener("click", (event) => {
//     event.preventDefault();

//     console.log("Remember me checkbox clicked");
//   });
// });

// //bytt ut document med navnet på buttonen som skal klikkes på//

// //denne søger for at siden er loadet før scriptet kjører//
// document.addEventListener("DOMContentLoaded", () => {
//   const loginButton = document.querySelector(".login");

//   loginButton.addEventListener("click", async (event) => {
//     event.preventDefault();

//     const email = document.querySelector("#email").value;
//     const password = document.querySelector("#password").value;
//     const rememberMe = document.querySelector("#rememberMe").checked;

//     if (rememberMe) {
//       localStorage.setItem("email", email);
//       localStorage.setItem("password", password);
//     } else {
//       localStorage.removeItem("email");
//       localStorage.removeItem("password");
//     }
//     await loginButton(email, password);
//   });

//   const storedEmail = localStorage.getItem("email");
//   if (storedEmail && storedPassword) {
//     document.getElementById("email").value = storedEmail;
//     document.getElementById("password").value = storedPassword;
//     document.getElementById("rememberMe").checked = true;
//   }
// });

// async function login(email, password) {
//   const url = "https://v2.api.noroff.dev/auth/login";
//   const data = { email, password };
// }

// try {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       accept: "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Login failed");
//   }

//   const result = await response.json();
//   console.log("Login successful:", result);
//   // Handle successful login here (e.g., store token, redirect user)
// } catch (error) {
//   console.error("Error:", error);
//   // Handle login error here (e.g., show error message to user)
// }

//   email: "ailinmari@stud.noroff.no",
//   password: "12345678",
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const rememberMe = document.querySelector(".checkbox");
//   rememberMe.addEventListener("click", (event) => {
//     event.preventDefault();

//     console.log("Remember me checkbox clicked");
//   });
// });

// document.addEventListener("click", async (event) => {
//   event.preventDefault();

//   const url = "https://v2.api.noroff.dev/auth/register";
//   const data = {
//     username: username,
//     email: email,
//     password: password,
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         accept: "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Registration failed");
//     }

//     const result = await response.json();
//     console.log("Registration successful:", result);
//     // Handle successful registration here (e.g., redirect user to login page)
//   } catch (error) {
//     console.error("Error:", error);
//     // Handle registration error here (e.g., show error message to user)
//   }
// });
