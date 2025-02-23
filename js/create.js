import { BlogApi, AuthError } from "./api-client.js";
let blogApi = new BlogApi();

document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.getElementById("createPostForm");

  if (createPostForm) {
    createPostForm.addEventListener("submit", async (event) => {
      if (!createPostForm.checkValidity()) {
        return;
      }

      event.preventDefault();

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const imageUrl = document.getElementById("imageUrl").value;
      const imageAlt = document.getElementById("imageAlt").value;

      try {
        await blogApi.createBlogpost(title, content, imageUrl, imageAlt);
        window.location.href = `../index.html`;
      } catch (error) {
        if (error instanceof AuthError) {
          displayCreationError("Failed to create post. You must be logged in to create a post.");
        } else {
          displayCreationError("Failed to create post. Verify you filled out all the fields and try again later.");
        }
      }
    });
  } else {
    console.error("Element with ID 'createPostForm' not found");
  }
});
function displayCreationError(message) {
  let creatingFailedDiv = document.getElementById("creating-failed");
  creatingFailedDiv.textContent = message;
}
