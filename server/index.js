const express = require('express')
const cors = require('cors')
const notesRouter = require('./routes/notes')

const app = express()

const port = process.env.PORT || 8090

app.use(cors())
app.use(express.json())
app.use('/api/v1/notes', notesRouter)

app.get("/", (req, res) => {
  res.json("Server up and running")
})

app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})