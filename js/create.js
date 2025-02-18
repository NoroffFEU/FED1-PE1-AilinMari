const sprinkledBliss = "https://v2.api.noroff.dev/blog/posts";
let blogposts = [];
let login = localStorage.getItem("userId");

// async function getBlogpost() {
//   try {
//     const response = await fetch(`${sprinkledBliss}/ailin_user`);
//     const { data } = await response.json();
//     blogposts = data;

//     createBlogpost(blogposts);
//   } catch (error) {
//     console.error("Error fetching blogposts", error);
//   }

//   // console.log("Blogposts:", blogposts);
// }

async function createBlogpost(title, content, imageUrl, imageAlt) {
  console.log("Creating blog post...");
  const url = "https://v2.api.noroff.dev/blog/posts/ailin_user";
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    
    // console.error("Please log in.");
    return;
  }
  const data = {
    title: title,
    body: content,
    media: {
      url: imageUrl,
      alt: imageAlt || "Default image description",
    },
    // author: data.author.id,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog post");
    }

    const result = await response.json();
    // console.log("Blog post created:", result);

    // Fetch the updated list of blog posts
    await getBlogpost();
  } catch (error) {
    // console.error("Error creating blog post", error);
  }
}

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

      await createBlogpost(title, content, imageUrl, imageAlt);
    });
  } else {
    console.error("Element with ID 'createPostForm' not found");
  }
  // console.log(resultJSON);
});
