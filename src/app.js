if (process.env.NODE_ENV !== "test") require("dotenv").config()
const cors = require("cors")
const ex = require("express")
const helmet = require("helmet")
const { json, urlencoded } = require("body-parser")
const { connection } = require("./db/mongo")
const routes = require("./api/routes/blog")

function express() {
    const app = ex()
    
    connection()
    app.use(helmet({ hidePoweredBy: true }))
    app.use(cors())
    app.use(urlencoded({ extended: true }))
    app.use(json())
    
    app.use(process.env.API_PREFIX || "/v1", routes)
    
    app.get("/health", (_, res) => {
      res.json({ "message": "Server is running :D" })
      res.status(200)
    })
    
    app.set('port', process.env.PORT || 3000)

    return app
}





module.exports = express()