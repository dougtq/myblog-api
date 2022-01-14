const mongoose = require("mongoose")

async function connection () {
  return mongoose
    .connect("mongodb://" + process.env.DB_HOST +":"+ process.env.DB_PORT + "/" + process.env.DB_NAME)
    .then((conn) => { 
      console.log("Successfully connected to the database")
      return conn
    })
    .catch(err => { 
      console.log("Error connecting to the database")
      console.error(err)
      process.exit(1)
    })
}

module.exports = {
  connection
}