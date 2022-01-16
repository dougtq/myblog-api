const { Router } = require("express")

const getAllPosts = require("../controllers/getAllPosts")
const getPostById = require("../controllers/getPostById")
const createPost = require("../controllers/createPost")
const updatePost = require("../controllers/updatePost")
const deletePost = require("../controllers/deletePost")

let routeScheme = Router()

routeScheme.get("/posts", async (_, res) => {
    let { result, statusCode } = await getAllPosts()

    res.status(statusCode).json(result)
})

routeScheme.get("/posts/:id", async (req, res) => {
    let { result, statusCode } = await getPostById(req)

    res.status(statusCode).json(result)
})

routeScheme.post("/posts", async(req, res) => {
    let { result, statusCode, message } = await createPost(req)

    res.status(statusCode).json({ message, post: result })
})

routeScheme.put("/posts/:id", async (req, res) => {
    let { result, statusCode, message } = await updatePost(req)

    res.status(statusCode).json({ message, post: result })
})

routeScheme.delete("/posts/:id", async (req, res) => {
    let { result, statusCode, message } = await deletePost(req)

    res.status(statusCode).json({ message, post: result })
})



module.exports = routeScheme