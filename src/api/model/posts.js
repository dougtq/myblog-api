const mongoose = require("mongoose")
const performance = require("perf_hooks").performance

const ObjectId = mongoose.Types.ObjectId
let mongoConn

const getModel = async () => {
  if (!mongoConn || [1, 2].indexOf(mongoConn.connection.readyState) === -1) {
    const { connection } = require("../../db/mongo")

    mongoConn = await connection()
  }
  console.debug("Estado Conexão MongoDB", mongoConn.connection.readyState)

  const COLLECTION_NAME = "posts"
  const WRITE_CONCERN = 1
  const WRITE_TIMEOUT = 1000

  const schemaPosts = new mongoConn.Schema({
    Title: {
      type: String
    },
    Description: {
      type: String
    },
    Author: {
      type: String
    },
    Categories: {
      type: Array
    },
    Active: {
      type: Boolean
    },
    CreatedAt: {
        type: Number
    },
    UpdatedAt: {
        type: Number
    },
    DeletedAt: {
        type: Number
    },
  }, {
    versionKey: false,
    writeConcern: {
      w: Number(WRITE_CONCERN),
      wtimeout: Number(WRITE_TIMEOUT)
    },
    collection: COLLECTION_NAME
  })

  return mongoConn.models[COLLECTION_NAME] || mongoConn.model(COLLECTION_NAME, schemaPosts)
}

const getAllActivePosts = async () => {
  console.time("getAllActivePosts")
  const db = await getModel()

  const posts = await db.find({
    "Active": true
  })

  console.timeEnd("getAllActivePosts")
  return posts
}

const createPost = async (Post, Active = true) => {
  try {
    console.time("createPost")
    const db = await getModel()

    let postPayload = {
      ...Post,
      CreatedAt: Date.now(),
      Active
    }

    let createdPost

    createdPost = await db.create(postPayload)
    console.timeEnd("createPost")

    return createdPost
  } catch (e) {
    console.error("Erro ao criaAcordo", e)
    return null
  }
}

const getPostById = async (id) => {
  console.time("getPostById")
  const db = await getModel()

  const acordo = await db.findOne({
    _id: id,
    Active: true
  })
  console.timeEnd("getPostById")

  return acordo
}

const updatePost = async (id, data = {}) => {
  if (!id) {
    throw new Error("post id not received")
  }

  const db = await getModel()

  const post = await db.findOneAndUpdate({
    _id: ObjectId(id),
    Active: true
  }, {
    $set: {
      ...data,
      UpdatedAt: Date.now()
    }
  }, {
    new: true
  })

  return post
}

const deletePost = async (id) => {
  console.time("deletePost")
  const db = await getModel()

  const deletedPost = await db.findOneAndUpdate({
    _id: ObjectId(id),
    Active: true
  }, {
    $set: {
      Active: false,
      DeletedAt: Date.now(),
    }
  }, {
    new: true
  })
  console.timeEnd("deletePost")

  return deletedPost
}

const deleteAll = async () => {
  console.time("deleteAll")
  const db = await getModel()

  const deletedInfo = await db.deleteMany({})
  console.timeEnd("deleteAll")

  return deletedInfo
}

module.exports = {
  getAllActivePosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  deleteAll
}
