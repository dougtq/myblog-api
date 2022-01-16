const { getPostById } = require("../model/posts")

module.exports = async function (req) {
    let post = null
    let statusCode = 404
    try {
        post = await getPostById(req.params["id"])

        if (post) {
            statusCode = 200
        }
    } catch (error) {
        console.error(error)
        statusCode = 500
    } finally {
        return { result: post, statusCode }
    }
}