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

    const postTitle = document.createElement("h3");
    postTitle.textContent = blogpost.title;

    const readMoreButton = document.createElement("button");
    readMoreButton.textContent = "Read more";
    readMoreButton.className = "read-more";
    readMoreButton.setAttribute("data-id", blogpost.id);
    readMoreButton.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Read more button clicked for blogpost:", blogpost);
    });

    link.appendChild(img);
    link.appendChild(postTitle);
    postContainer.appendChild(link);
    postContainer.appendChild(readMoreButton);

    thumbnailGrid.appendChild(postContainer);
  });
  console.log("Blogposts rendered");
}

//auther register

const authorRegister = "https://v2.api.noroff.dev/auth/register";

const authorLogIn = "https://v2.api.noroff.dev/auth/login";
