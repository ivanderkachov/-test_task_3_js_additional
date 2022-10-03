const express = require('express')
const cors = require('cors')
const path = require("path")
const sequelize = require('./util/database')
const Notes = require('./models/notes')
require("dotenv").config({ path: ".env" })
const notesRouter = require('./routes/notes/index')
const notesDbRouter = require('./routes/notes/dbnotes')

const app = express()

const port = process.env.PORT || 8090

app.use(cors())
app.use(express.json())
app.use('/api/v1/notes', notesRouter)
app.use('/api/v1/db', notesDbRouter)

app.use(express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build", "../build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

(async () => {
  try {
    await sequelize.sync({
      force: false
    })
    app.listen(port, () => {
      console.log(`Server has started on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})()

