const sprinkledBliss = "https://v2.api.noroff.dev/blog/posts/ailin_user";
let blogpostId = new URLSearchParams(window.location.search).get("id");

async function getBlogpost() {
  try {
    const response = await fetch(`${sprinkledBliss}/${blogpostId}`);
    const post = await response.json();

    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.body;
    document.getElementById("imageUrl").value = post.media.url;
    document.getElementById("imageAlt").value = post.media.alt;
  } catch (error) {
    console.error("Error fetching blogpost", error);
  }
}

async function updateBlogpost(title, content, imageUrl, imageAlt) {
  const url = `${sprinkledBliss}/${blogpostId}`;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.error("Please log in.");
    return;
  }
  const data = {
    title: title,
    body: content,
    media: {
      url: imageUrl,
      alt: imageAlt || "Default image description",
    },
  };
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update blog post");
    }

    const result = await response.json();
    console.log("Blog post updated:", result);

    // Redirect to the blog post page
    window.location.href = `post/index.html?id=${blogpostId}`;
  } catch (error) {
    console.error("Error updating blog post", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getBlogpost();

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
