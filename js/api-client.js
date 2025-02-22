
export class BlogApi {
    constructor() {
        this.baseUrl = "https://v2.api.noroff.dev";
        this.blogName = "ailin_user";
        this.blogUrl = `${this.baseUrl}/blog/posts/${this.blogName}`;
        this.authUrl = `${this.baseUrl}/auth`;

    }

    async getBlogpostByID(postId) {
        try {
            const response = await fetch(`${this.blogUrl}/${postId}`);
            const { data } = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching blogpost", error);
            throw error;
        }
    }

    async getBlogposts() {
        try {
            const response = await fetch(`${this.blogUrl}`);
            const { data } = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching blogposts", error);
            throw error;
        }
    }

    async createBlogpost( title, content, imageUrl, imageAlt) {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            // Navigate to login page
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
            const response = await fetch(`${this.blogUrl}`, {
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

            return await response.json();
        } catch (error) {
            console.error("Error creating blog post", error);
        }
    }

    async deleteBlogpost(postId) {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {

            return;
        }
        try {
            const response = await fetch(`${this.blogUrl}/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete blog post");
            }

            console.log("Blog post deleted:", postId);

        } catch (error) {
            console.error("Error deleting blog post", error);
        }
    }
}