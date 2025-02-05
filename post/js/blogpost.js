const sprinkledBliss = "https://v2.api.noroff.dev/blog/posts/ailin_user";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
// let blogpost = JSON.parse(localStorage.getItem("#blogposts")) || [];

async function getBlogpostByID() {
  try {
    const response = await fetch(`${sprinkledBliss}/${postId}`);
    const { data } = await response.json();
    // blogpost = data;

    renderBlogpostbyId(data);

  } catch (error) {
    console.error("Error fetching blogpost", error);
  }
}



  function renderBlogpostbyId(blogpost) {
    const postContainer = document.getElementById("blogpost");

    // const link = document.getElementById("blogposts");
    // link.href = `post/index.html?id=${blogpost.id}`;

    const img = document.createElement("img");
    img.src = blogpost.media.url;
    img.alt = blogpost.media.alt;

    const postTitle = document.createElement("h1");
    postTitle.textContent = blogpost.title;

    const postContent = document.createElement("p");
    postContent.textContent = blogpost.body;
  
    postContainer.appendChild(img);
    postContainer.appendChild(postTitle);
    postContainer.appendChild(postContent);
  }

  getBlogpostByID();

   console.log("Blogpost:", blogpost);

