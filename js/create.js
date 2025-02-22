import { BlogApi } from "./api-client.js";
let blogApi = new BlogApi();

document.addEventListener("DOMContentLoaded", () => {
  // const result = localStorage.getItem("result");
  // const JSONresult =  JSON.parse(result);
  const createPostForm = document.getElementById("createPostForm");

  if (createPostForm) {
    createPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      // console.log("Create post button clicked");

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const imageUrl = document.getElementById("imageUrl").value;
      const imageAlt = document.getElementById("imageAlt").value;

      await blogApi.createBlogpost(title, content, imageUrl, imageAlt);

      window.location.href = `../index.html`;
    });
  } else {    
    console.error("Element with ID 'createPostForm' not found");

  }
  // console.log(resultJSON);
});
