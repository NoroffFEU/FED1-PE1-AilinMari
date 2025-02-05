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

getBlogpost();

let currentIndex = 0;

function changeSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
document
  .querySelector(".prev")
  .addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));
function renderBlogposts(post) {
  const thumbnailGrid = document.getElementById("blogposts");
  thumbnailGrid.className = "thumbnail-grid";
  thumbnailGrid.innerHTML = "";

  post.forEach((blogpost) => {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";

    const link = document.createElement("a");
    link.href = `post/index.html?id=${blogpost.id}`;

    const img = document.createElement("img");
    img.src = blogpost.media.url;
    img.alt = blogpost.media.alt;

    const postTitle = document.createElement("h4");
    postTitle.textContent = blogpost.title;

    const readMoreButton = document.createElement("a");
    readMoreButton.textContent = "Read more";
    readMoreButton.className = "read-more";
    readMoreButton.setAttribute("data-id", blogpost.id);
    readMoreButton.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Read more button clicked for blogpost:", blogpost);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete post";
    deleteButton.className = "delete-btn";
    deleteButton.setAttribute("data-id", blogpost.id);
    deleteButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const postId = event.target.getAttribute("data-id");
      await deleteBlogpost(postId);
    });

    link.appendChild(postTitle);
    link.appendChild(img);
    postContainer.appendChild(link);
    postContainer.appendChild(readMoreButton);
    postContainer.appendChild(deleteButton);

    thumbnailGrid.appendChild(postContainer);
  });
  console.log("Blogposts rendered");
}

async function deleteBlogpost(postId) {
  const url = `https://v2.api.noroff.dev/blog/posts/ailin_user/${postId}`;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.error("Please log in.");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete blog post");
    }

    console.log("Blog post deleted:", postId);

    // Fetch the updated list of blog posts
    await getBlogpost();
  } catch (error) {
    console.error("Error deleting blog post", error);
  }
}

//auther register

const authorRegister = "https://v2.api.noroff.dev/auth/register";

const authorLogIn = "https://v2.api.noroff.dev/auth/login";
