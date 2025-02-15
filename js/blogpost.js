const sprinkledBliss = "https://v2.api.noroff.dev/blog/posts/ailin_user";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function getBlogpostByID() {
  try {
    const response = await fetch(`${sprinkledBliss}/${postId}`);
    const { data } = await response.json();

    renderBlogpostbyId(data);
  } catch (error) {
    console.error("Error fetching blogpost", error);
  }
}

function renderBlogpostbyId(blogpost) {
  const postContainer = document.getElementById("blogpost");

  const img = document.createElement("img");
  img.src = blogpost.media.url;
  img.alt = blogpost.media.alt;

  const postTitle = document.createElement("h1");
  postTitle.textContent = blogpost.title;

  const author = document.createElement("p");
  author.textContent = "By: " + blogpost.author.name;
  
  postContainer.appendChild(img);
  postContainer.appendChild(postTitle);
  postTitle.appendChild(author);

  const postContentContainer = document.getElementById("blogpost-content");

  const paragraphs = blogpost.body.split('\n');
  paragraphs.forEach(paragraph => {
    const postContent = document.createElement("p");
    postContent.textContent = paragraph;
    postContent.className = "post-content";
    postContentContainer.appendChild(postContent);
  });

  const createdDate = document.createElement("p");
  createdDate.textContent = "published " + blogpost.created.split("T")[0];
  createdDate.className = "created-date";

  postContentContainer.appendChild(createdDate);
}

function copyToClipboard() {
  const linkIcon = document.querySelector(".link-icon");
  linkIcon.addEventListener("click", () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy link: ", err);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getBlogpostByID();
  copyToClipboard();
});

console.log("Blogpost:", blogpost);
