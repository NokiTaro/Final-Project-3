const express = require("express")
const app = express()
const PORT = 7000
const routes = require("./routes")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.get("",  (req, res) => {
    res.send("FP3")
})

app.listen(PORT, () => {
    console.log("App running on port: ", PORT);
})
