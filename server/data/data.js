const taskData =  {
    1662907031392: {
      id: 1662907031392,
      Name: "Shopping list",
      Created: new Date(1662907031392).toLocaleDateString(),
      Category: "Task",
      Content: "Tomatoes, bread",
      Dates: "",
    },
    1662907031393: {
      id: 1662907031393,
      Name: "The theory",
      Created: new Date(1662907031393).toLocaleDateString(),
      Category: "Random thoughts",
      Content: "The theory ...",
      Dates: "",
    },
    1662907031394: {
      id: 1662907031394,
      Name: "New feature",
      Created: new Date(1662907031394).toLocaleDateString(),
      Category: "Idea",
      Content: "Implement new feature",
      Dates: "",
    },
  }
const taskDataArchive = {}
const category = ["Task", "Random thoughts", "Idea"];


  module.exports = { taskData, taskDataArchive, category}