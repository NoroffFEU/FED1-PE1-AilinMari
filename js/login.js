document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login");

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const url = "https://v2.api.noroff.dev/auth/login";
    const data = {
      email: "ailinmari@stud.noroff.no",
      password: "12345678",
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

      const result = await response.json();
      const accessToken = result.data.accessToken;

      console.log(accessToken);

      console.log("Login successful:", result);

      //   Handle successful login here (e.g., store token, redirect user)
      localStorage.setItem("accessToken", accessToken);

      if (remember) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    } catch (error) {
      console.error("Error:", error);
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
  console.log("Login successful:", result);
});

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
