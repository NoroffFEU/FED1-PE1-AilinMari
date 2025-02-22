import { BlogApi } from "./api-client.js";
let blogApi = new BlogApi();
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function loadBlogPost() {
  let blogPost = await blogApi.getBlogpostByID(postId);

  populateFormFields(blogPost);
}

function populateFormFields(post) {
  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.body;
  document.getElementById("imageUrl").value = post.media.url;
  document.getElementById("imageAlt").value = post.media.alt;
}

async function updateBlogpost(title, content, imageUrl, imageAlt) {
  try { 
    await blogApi.updateBlogpost(postId, title, content, imageUrl, imageAlt);
  }
  catch (error) {
    document.getElementById("creating-failed").textContent = "Failed to update post, please fill out all the fields";
  }
  // Redirect to the blog post page
  window.location.href = `/FED1-PE1-AilinMari/post/index.html?id=${postId}`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadBlogPost();

  const editPostForm = document.getElementById("createPostForm");

  if (editPostForm) {
    editPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Update post button clicked");

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const imageUrl = document.getElementById("imageUrl").value;
      const imageAlt = document.getElementById("imageAlt").value;

      await updateBlogpost(title, content, imageUrl, imageAlt);
    });
  } else {
    console.error("Element with ID 'createPostForm' not found");
  }
});
