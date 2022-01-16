const request = require("supertest")
const { expect } = require("chai")
require("dotenv").config({ path: ".env.test" })
const app = require("../../src/app")

describe("API tests", () => {
    describe("Health test", () => {
    
        it("should return a valid response when api is initially healthy", async () => {    
            const response = await request(app)
                .get("/health")
    
            expect(response.status).equal(200)
        })
    })

    describe("Blog post tests", () => {
        let postId = null

        after(async () => {
            const { deleteAll } = require("../../src/api/model/posts")

            await deleteAll()
        })


        it("should return a valid response when fetched all active posts", async () => {    
            const response = await request(app)
                .get(process.env.API_PREFIX + "/posts")
    
            expect(response.status).equal(200)
        })
    
        it("should return a valid response when the post is created", async () => {    
            const response = await request(app)
                .post(process.env.API_PREFIX + "/posts")
                .send({
                    "Title": "Testing...",
                    "Description": "Sample text",
                    "Author": "Douglas E. Alves",
                    "Categories": ["first", "hello-world"]
                })
            
            postId = response.body.post._id
            
            expect(response.status).equal(201)
            expect(response.body.message).equals("Post was created successfully", "Invalid message")
        })

        it("should return a valid response when post details is found", async () => {    
            const response = await request(app)
                .get(process.env.API_PREFIX + "/posts/" + postId)
    
            expect(response.status).equal(200)
        })

        it("should return a valid response when the post is updated", async () => {    
            const response = await request(app)
                .put(process.env.API_PREFIX + "/posts/" + postId)
                .send({
                    "Title": "Testing 2...",
                    "Description": "Sample text 2",
                    "Author": "Douglas E. Alves",
                    "Categories": ["second"]
                })
                        
            expect(response.status).equal(200)
            expect(response.body.message).equals("Post was updated successfully", "Invalid message")
        })

        it("should return a valid response when the post is deleted", async () => {    
            const response = await request(app)
                .delete(process.env.API_PREFIX + "/posts/" + postId)
                        
            expect(response.status).equal(200)
        })

        it("should not return a valid response when post details is not existent", async () => {    
            const response = await request(app)
                .get(process.env.API_PREFIX + "/posts/" + "61e1902b81b61221b7f3c763")
    
            expect(response.status).equal(404)
        })

        it("should not return a valid response when the post is not existent", async () => {    
            const response = await request(app)
                .put(process.env.API_PREFIX + "/posts/" + "61e1902b81b61221b7f3c763")
                .send({
                    "Title": "Testing 2...",
                    "Description": "Sample text 2",
                    "Author": "Douglas E. Alves",
                    "Categories": ["second"]
                })
                        
            expect(response.status).equal(404)
            expect(response.body.message).equals("Post not found", "Invalid message")
        })

        it("should not return a valid response when the post is not existent", async () => {    
            const response = await request(app)
                .put(process.env.API_PREFIX + "/posts/" + "61e1902b81b61221b7f3c763")
                .send({
                    "Description": "Sample text 2",
                    "Author": "Douglas E. Alves",
                    "Categories": ["second"]
                })
                        
            expect(response.status).equal(400)
            expect(response.body.message).equals("Your post does not have the necessary fields (title and/or description and/or author) to be updated", "Invalid message")
        })

        it("should not return a valid response when the post is not existent", async () => {    
            const response = await request(app)
                .post(process.env.API_PREFIX + "/posts")
                .send({
                    "Title": "Testing 2...",
                    "Description": "Sample text 2",
                    "Categories": ["second"]
                })
                        
            expect(response.status).equal(400)
            expect(response.body.message).equals("Your post does not have the necessary fields (title and/or description and/or author) to be created", "Invalid message")
        })

        it("should not return a valid response when the post is not existent", async () => {    
            const response = await request(app)
                .delete(process.env.API_PREFIX + "/posts/" + "61e1902b81b61221b7f3c763")
                        
            expect(response.status).equal(404)
        })

        it("should not return a valid response when the post is not existent", async () => {    
            const response = await request(app)
                .delete(process.env.API_PREFIX + "/posts/" + postId)
                        
            expect(response.status).equal(404)
        })

    })

})