import { BlogApi } from "./api-client.js";
let blogApi = new BlogApi();

async function getBlogpost() {
  try {
    let blogposts = await blogApi.getBlogposts();

    renderBlogposts(blogposts);
    updateCarousel(blogposts);
  } catch (error) {
    console.error("Error fetching blogposts", error);
  }
}
getBlogpost();

function updateCarousel(blogposts) {
  const slidesContainer = document.querySelector(".slides");
  slidesContainer.innerHTML = "";

  const latestPosts = blogposts.slice(0, 3);
  latestPosts.forEach((post) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const img = document.createElement("img");
    img.src = post.media.url;
    img.alt = post.media.alt;

    const titleBubble = document.createElement("h1");
    titleBubble.textContent = post.title;

    const author = document.createElement("p");
    author.textContent = "by " + post.author.name;
    author.className = "author-readmore";

    const readMore = document.createElement("a");
    readMore.textContent = "Read more";
    readMore.className = "read-more";
    readMore.href = `post/index.html?id=${post.id}`;

    slide.appendChild(img);
    slide.appendChild(titleBubble);
    titleBubble.appendChild(author);
    author.appendChild(readMore);
    slidesContainer.appendChild(slide);
  });
}

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

    const postTitle = document.createElement("h5");
    postTitle.textContent = blogpost.title;

    const readMoreButton = document.createElement("a");
    readMoreButton.textContent = "Read more";
    readMoreButton.className = "read-more";
    readMoreButton.href = `post/index.html?id=${blogpost.id}`;

    const editPostButton = document.createElement("button");
    editPostButton.textContent = "Edit post";
    editPostButton.className = "edit-btn";
    editPostButton.addEventListener("click", () => {
      window.location.href = `post/edit.html?id=${blogpost.id}`;
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
    
    const newPostButton = document.querySelector("#new-post");

    const accessToken = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");
    if (!accessToken || blogpost.author.name !== name) {
      editPostButton.style.display = "none";
      deleteButton.style.display = "none";
      newPostButton.style.display = "none";
    }

    link.appendChild(postTitle);
    link.appendChild(img);

    postContainer.appendChild(link);
    postContainer.appendChild(readMoreButton);
    postContainer.appendChild(editPostButton);
    postContainer.appendChild(deleteButton);

    thumbnailGrid.appendChild(postContainer);
  });
}

async function deleteBlogpost(postId) {
  try {
    await blogApi.deleteBlogpost(postId);
    window.location.href = `index.html`;
  } catch (error) {
    if (error instanceof AuthError) {
      alert("Failed to delete post. You must be logged in to delete a post.");
      return;
    }
    alert("Failed to delete post");
  }
  // Fetch the updated list of blog posts
  await getBlogpost();
}
