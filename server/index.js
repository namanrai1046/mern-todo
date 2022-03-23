const express = require("express")
const User = require("./models/model")
const app = express()
const cors = require("cors")
const router = require("./routes/route")
const connect = require("./connect/connect")
require("dotenv").config()


app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello There!");
})

app.use("/api/v1", router)

const start = async () => {
    try {
        await connect()
        console.log("Database is connected")
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server is running on port 5000")
        })
    }
    catch (err) {
        console.log(err)
    }
}

start()
