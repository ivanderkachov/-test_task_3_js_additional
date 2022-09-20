const express = require('express')
const cors = require('cors')
const path = require('path')
require("dotenv").config({path: ".env"})
let { taskData, taskDataArchive, category } = require('./data/data')
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
})

app.delete("/api/v1/notes/:id", async (req, res) => {
  const { id } = req.params
  await delete taskData[id]
  res.json({ status: "ok", taskData });
})

app.post("/api/v1/notes", async (req, res) => {
  const { task } = req.body
  taskData = await { ...taskData, [task.id]: task };
  res.json({ status: "ok", taskData });
})

app.patch("/api/v1/notes/:id", async (req, res) => {
  const { id } = req.params
  const { type } = req.body
  if (type === 'archive') {
    taskDataArchive = await { ...taskDataArchive, [id]: taskData[id]}
    await delete taskData[id]
    res.json({ status: "ok", taskData, taskDataArchive });
  }
  if (type === 'unarchive') {
    taskData = await { ...taskData, [id]: taskDataArchive[id] };
    await delete taskDataArchive[id];
    res.json({ status: "ok", taskData, taskDataArchive });
  }
})

app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})