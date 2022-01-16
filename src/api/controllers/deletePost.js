const { deletePost } = require("../model/posts")

module.exports = async function (req) {
    let post = null
    let message = "Your post id was not found"
    let statusCode = 400
    try {
        post = await deletePost(req.params["id"])

        if (!post) {
            return
        }

        statusCode = 200
        message = "Post was deleted successfully"
    } catch (error) {
        console.error(error)
        statusCode = 500
        message = "An unexpected error ocurred"
    } finally {
        return { result: post, statusCode, message }
    }
}