// async function deleteBlogpost(postId) {
//   const url = `https://v2.api.noroff.dev/blog/posts/ailin_user/${postId}`;
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) {
//     console.error("Please log in.");
//     return;
//   }

//   try {
//     const response = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to delete blog post");
//     }
//     // Fetch the updated list of blog posts
//     await getBlogpost();
//   } catch (error) {
//     console.error("Error deleting blog post", error);
//   }
// }

// function createEditButton(blogpost) {
//   const editPostButton = document.createElement("button");
//   editPostButton.textContent = "Edit post";
//   editPostButton.className = "edit-btn";
//   editPostButton.addEventListener("click", () => {
//     window.location.href = `/post/edit.html?id=${blogpost.id}`;
//   });

//   return editPostButton;
// }

// function createDeleteButton(blogpost) {
//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete post";
//   deleteButton.className = "delete-btn";
//   deleteButton.setAttribute("data-id", blogpost.id);
//   deleteButton.addEventListener("click", async (event) => {
//     event.preventDefault();
//     const postId = event.target.getAttribute("data-id");
//     await deleteBlogpost(postId);
//   });

//   return deleteButton;
// }
