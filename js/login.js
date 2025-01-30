//bytt ut document med navnet på buttonen som skal klikkes på//

//denne søger for at siden er loadet før scriptet kjører//
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
      console.log("Login successful:", result);
      // Handle successful login here (e.g., store token, redirect user)
    } catch (error) {
      console.error("Error:", error);
      // Handle login error here (e.g., show error message to user)
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const rememberMe = document.querySelector(".checkbox");
  rememberMe.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Remember me checkbox clicked");
  });
});

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
