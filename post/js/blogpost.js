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

  const author = document.createElement("p");
  author.textContent = "By: " + blogpost.author.name;
  
  postContainer.appendChild(img);
  postContainer.appendChild(postTitle);
  postTitle.appendChild(author);

  const postContentContainer = document.getElementById("blogpost-content");

  const postContent = document.createElement("p");
  postContent.textContent = blogpost.body;
  postContent.className = "post-content";

  const createdDate = document.createElement("p");
createdDate.textContent = "published " + blogpost.created.split("T")[0];
createdDate.className = "created-date";

// if{
//     (blogpost.title.img.body = blogpost.updated)

// }
//trying tp make a "if the post has been update, show the updated date"
// const editDate = document.createElement("p");
// editDate.textContent = "edited " + blogpost.updated.split("T")[0];
// editDate.className = "created-date";


  postContentContainer.appendChild(postContent);
  postContentContainer.appendChild(createdDate);
//   postContentContainer.appendChild(editDate);

}

getBlogpostByID();

console.log("Blogpost:", blogpost);
