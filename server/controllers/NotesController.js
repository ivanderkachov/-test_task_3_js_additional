const NotesService = require('../services/notes/NotesService.js')
const { getDates, sortData } = require('../helpers/helpers');



class NotesController {

  getAll(req, res) {
    try {
      const taskData = NotesService.getAll()
      return res.json({ status: "ok", taskData: sortData(taskData) });
    } catch (err) {
      res.json({ status: "ERROR", err });
    }
  }
  getStats(req, res) {
    try {
      const summaryAll = NotesService.getStats()
      return res.json({ status: "ok", summaryAll: sortData(summaryAll) });
    } catch (err) {
      res.json({ status: "ERROR", err });
    }
  }
  async delete(req, res) {
    try {
      const taskData = await NotesService.delete(req.params.id)
      res.json({ status: "ok", taskData: sortData(taskData) });
    } catch (err) {
      res.json({ status: "ERROR", err });
    }
  }
  async addTask(req, res) {
     const { task } = req.body;
     try {
       task.Dates = await getDates(task.Content);
       const taskData = await NotesService.addTask(task)
       res.json({ status: "ok", taskData: sortData(taskData) });
     } catch (err) {
       res.json({ status: "ERROR", err });
     }

  }
  async archiveAct(req, res) {
    const { id } = req.params
  const { type } = req.body
  try {
    const data = await NotesService.archiveAct(type, id)
    res.json({ status: "ok", taskData: sortData(data.taskData), taskDataArchive: sortData(data.taskDataArchive) });
  } catch (err) {
    res.json({ status: "ERROR", err });
  }
  }
}


module.exports = new NotesController()