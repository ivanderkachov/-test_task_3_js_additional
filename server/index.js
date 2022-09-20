const express = require('express')
const cors = require('cors')
const path = require('path')
require("dotenv").config({path: ".env"})
const { taskData, taskDataArchive, category } = require('./data/data')
const app = express()
const router = express.Router()


const port = process.env.PORT || 8090

app.use(cors())
app.use(router)
app.use(express.json())

app.get("/", (req, res) => {
  res.json("Server up and running")
})

app.get("/api/v1/notes", (req, res) => {
  res.json({status: 'ok', taskData})
})
app.get("/api/v1/notes/stats", (req, res) => {
   const summaryTable = category.reduce((acc, rec ) => {
      return { ...acc, [rec]: Object.values(taskData).filter((it) => it.Category === rec).length} ;
    }, {});
    const summaryTableArchive = category.reduce((acc, rec ) => {
      return { ...acc, [rec]: Object.values(taskDataArchive).filter((it) => it.Category === rec).length };
    }, {});
    const summaryAll = category.reduce((acc, rec) => {
      return { ...acc, [rec]: {Category: rec, Active: summaryTable[rec], Archived: summaryTableArchive[rec] }};
    }, {});
  res.json({ status: "ok", summaryAll });
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})