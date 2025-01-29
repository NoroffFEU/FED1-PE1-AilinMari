//bytt ut document med navnet på buttonen som skal klikkes på//

document.addEventListener("click", async (event) => {
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
