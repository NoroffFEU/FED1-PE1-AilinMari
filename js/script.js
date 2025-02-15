const sprinkledBliss = "https://v2.api.noroff.dev/blog/posts/ailin_user";
// const accessToken = localStorage.getItem("accessToken");
async function getBlogpost() {
  try {
    const response = await fetch(sprinkledBliss);
    const { data } = await response.json();
    blogposts = data;

    renderBlogposts(blogposts);
    updateCarousel(blogposts);
  } catch (error) {
    console.error("Error fetching blogposts", error);
  }

  console.log("Blogposts:", blogposts);
}

//Husk å legge inn linking til blogposter i slides
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
    readMoreButton.href = `post/index.html?id=${blogpost.id}`;

    const editPostButton = document.createElement("button");
    editPostButton.textContent = "Edit post";
    editPostButton.className = "edit-btn";
    editPostButton.addEventListener("click", () => {
      window.location.href = `/post/edit.html?id=${blogpost.id}`;
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

    const accessToken = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");
    if (!accessToken || blogpost.author.name !== name) {
      editPostButton.style.display = "none";
      deleteButton.style.display = "none";
    }

    link.appendChild(postTitle);
    link.appendChild(img);

    postContainer.appendChild(link);
    postContainer.appendChild(readMoreButton);
    postContainer.appendChild(editPostButton);
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

// const navbarLogin = document.querySelector(".log-in");
// const loginButton = document.createElement("a");
// loginButton.textContent = "Log in to your account";
// loginButton.href = "/account/login.html";

// const navbarCreate = document.querySelector(".create-account");
// const createAccount = document.createElement("a");
// createAccount.textContent = "Or create account";
// createAccount.href = "/account/register.html";

// navbarLogin.appendChild(loginButton);
// navbarCreate.appendChild(createAccount);

//auther register

const authorRegister = "https://v2.api.noroff.dev/auth/register";

const authorLogIn = "https://v2.api.noroff.dev/auth/login";
