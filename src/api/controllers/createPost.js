const { createPost } = require("../model/posts")

module.exports = async function (req) {
    let { Title, Description, Author, Categories } = req.body
    let post = null
    let message = "Your post does not have the necessary fields (title and/or description and/or author) to be created"
    let statusCode = 400
    try {
        if (!String(Title || "").trim() || !String(Description|| "").trim() || !String(Author || "").trim()) {
            return
        }

        post = await createPost({ Title, Description, Author, Categories })
        statusCode = 201
        message = "Post was created successfully"
    } catch (error) {
        console.error(error)
        statusCode = 500
        message = "An unexpected error ocurred"
    } finally {
        return { result: post, statusCode, message }
    }
}