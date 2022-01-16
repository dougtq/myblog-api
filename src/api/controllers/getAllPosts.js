const { getAllActivePosts } = require("../model/posts")

module.exports = async function () {
    let posts = []
    let statusCode = 200
    try {
        posts = await getAllActivePosts()
    } catch (error) {
        console.error(error)
        statusCode = 500
    } finally {
        return { result: posts, statusCode }
    }
}