const express = require('express')
const router = express.Router()
let { taskData, taskDataArchive, category } = require("../../data/data");
const { getDates } = require("../../helpers/helpers");

router.get("/", (req, res) => {
  res.json({status: 'ok', taskData})
})

router.get("/stats", (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await delete taskData[id]
  res.json({ status: "ok", taskData });
})

router.post("/", async (req, res) => {
  const { task } = req.body
  task.Dates = await getDates(task.Content)
  taskData = await { ...taskData, [task.id]: task };
  res.json({ status: "ok", taskData });
})

router.patch("/:id", async (req, res) => {
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

module.exports = router
