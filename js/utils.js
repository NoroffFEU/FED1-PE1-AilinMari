export class Utils {


    static getPostId() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");
        return postId;
    }

    // try {
    //     const response = await fetch(
    //         `https://v2.api.noroff.dev/blog/posts/${name}`, 
    //         {
    //             method: "GET",
    //             headers: {
    //                 accept: "application/json",     
    //             },
    //         }
    //     );
    // }


}