const { updatePost } = require("../model/posts")

module.exports = async function (req) {
    let { Title, Description, Author, Categories } = req.body
    let { id } = req.params
    let post = null
    let message = "Your post does not have the necessary fields (title and/or description and/or author) to be updated"
    let statusCode = 400
    try {
        if (!String(Title || "").trim() || !String(Description || "").trim() || !String(Author || "").trim()) {
            return
        }

        post = await updatePost(id, { Title, Description, Author, Categories })

        if (post) {
            statusCode = 200
            message = "Post was updated successfully"
        } else {
            statusCode = 404
            message = "Post not found" 
        }
    } catch (error) {
        console.error(error)
        statusCode = 500
        message = "An unexpected error ocurred"
    } finally {
        return { result: post, statusCode, message }
    }
}