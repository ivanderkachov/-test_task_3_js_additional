let { taskData, taskDataArchive, category } = require('../../data/data');


class NotesService {
  getAll() {
    const notes = taskData
    return notes
  }
  getStats() {
    const summaryTable = category.reduce((acc, rec ) => {
      return { ...acc, [rec]: Object.values(taskData).filter((it) => it.Category === rec).length} ;
    }, {});
    const summaryTableArchive = category.reduce((acc, rec ) => {
      return { ...acc, [rec]: Object.values(taskDataArchive).filter((it) => it.Category === rec).length };
    }, {});
    const summaryAll = category.reduce((acc, rec) => {
      return { ...acc, [rec]: {Category: rec, Active: summaryTable[rec], Archived: summaryTableArchive[rec] }};
    }, {});
    return summaryAll
  }
  async delete(id) {
    await delete taskData[id]
    return taskData
  }
  async addTask(task) {
    taskData = await { ...taskData, [task.id]: task };
    return taskData
  }
  async archiveAct(type, id) {
    if (type === "archive") {
      taskDataArchive = await { ...taskDataArchive, [id]: taskData[id] };
      await delete taskData[id];
      const data = {taskData, taskDataArchive}
      return data
    }
    if (type === "unarchive") {
      taskData = await { ...taskData, [id]: taskDataArchive[id] };
      await delete taskDataArchive[id];
      const data = { taskData, taskDataArchive };
      return data
    }
  }
}

module.exports = new NotesService()