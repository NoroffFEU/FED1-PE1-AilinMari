export class Utils {


    static getPostId() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");
        return postId;
    }


}