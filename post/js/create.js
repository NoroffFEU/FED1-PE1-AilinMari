const sprinkledBliss = "https://v2.api.noroff.dev/blog/posts/ailin_user";

async function getBlogpost() {
  try {
    const response = await fetch(sprinkledBliss);
    const { data } = await response.json();
    blogposts = data;

    renderBlogposts(blogposts);
  } catch (error) {
    console.error("Error fetching blogposts", error);
  }

  console.log("Blogposts:", blogposts);
}

async function createBlogpost(title, content, imageUrl, imageAlt) {
  const url = "https://v2.api.noroff.dev/blog/posts";
  const data = {
    title: title,
    content: content,
    image: {
      url: imageUrl,
      alt: imageAlt,
    },
    author: "ailin_user",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    const result = await response.json();
    console.log("Blog post created:", result);

    // Fetch the updated list of blog posts
    await getBlogpost();
  } catch (error) {
    console.error("Error creating blog post", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.getElementById("createPostForm");

  createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const imageAlt = document.getElementById("imageAlt").value;

    await createBlogpost(title, content, imageUrl, imageAlt);
  });
});
