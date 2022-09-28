const express = require('express')
const router = express.Router()
let { taskData, taskDataArchive, category } = require("../../data/data");
const { getDates, sortData } = require("../../helpers/helpers")
const { validateTaskBody, validateTypeBody } = require("../../services/validation")
const NotesController = require('../../controllers/NotesController.js')



router.get("/", NotesController.getAll)
router.get("/stats", NotesController.getStats)
router.delete("/:id", NotesController.delete)
router.post("/", validateTaskBody, NotesController.addTask)
router.patch("/:id", validateTypeBody, NotesController.archiveAct)



// router.get("/", (req, res) => {
//   try {
//     res.json({ status: "ok", taskData: sortData(taskData) });
//   } catch (err) {
//     res.json({ status: "ERROR", err });
//   }
// })

// router.get("/stats", (req, res) => {
//   try {
//     const summaryTable = category.reduce((acc, rec ) => {
//       return { ...acc, [rec]: Object.values(taskData).filter((it) => it.Category === rec).length} ;
//     }, {});
//     const summaryTableArchive = category.reduce((acc, rec ) => {
//       return { ...acc, [rec]: Object.values(taskDataArchive).filter((it) => it.Category === rec).length };
//     }, {});
//     const summaryAll = category.reduce((acc, rec) => {
//       return { ...acc, [rec]: {Category: rec, Active: summaryTable[rec], Archived: summaryTableArchive[rec] }};
//     }, {});
//   res.json({ status: "ok", summaryAll: sortData(summaryAll) });
//   } catch (err) {
//     res.json({ status: "ERROR", err });
//   }

// })

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params
//   try {
//     await delete taskData[id];
//     res.json({ status: "ok", taskData: sortData(taskData) });
//   } catch (err) {
//     res.json({ status: "ERROR", err });
//   }

// })

// router.post("/", validateTaskBody, async (req, res) => {
//   const { task } = req.body
//   try {
//     task.Dates = await getDates(task.Content);
//     taskData = await { ...taskData, [task.id]: task };
//     res.json({ status: "ok", taskData: sortData(taskData) });
//   } catch (err) {
//     res.json({ status: "ERROR", err });
//   }

// })

// router.patch("/:id", validateTypeBody, async (req, res) => {
//   const { id } = req.params
//   const { type } = req.body
//   try {
//     if (type === "archive") {
//       taskDataArchive = await { ...taskDataArchive, [id]: taskData[id] };
//       await delete taskData[id];
//       res.json({ status: "ok", taskData: sortData(taskData), taskDataArchive: sortData(taskDataArchive) });
//     }
//     if (type === "unarchive") {
//       taskData = await { ...taskData, [id]: taskDataArchive[id] };
//       await delete taskDataArchive[id];
//       res.json({ status: "ok", taskData: sortData(taskData), taskDataArchive: sortData(taskDataArchive)});
//     }
//   } catch (err) {
//     res.json({ status: "ERROR", err });
//   }
// })

module.exports = router
