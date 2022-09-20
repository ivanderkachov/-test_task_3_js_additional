import axios from 'axios'

const GET_TASKS = 'GET_TASKS'
const ADD_TASK_TO_ARCHIVE = "ADD_TASK_TO_ARCHIVE";
const UNARCHIVE_TASK = "UNARCHIVE_TASK";
const DELETE_TASK = "DELETE_TASK";
const ADD_TASK = "ADD_TASK";
const SUMMARY = "SUMMARY"

const category = ["Task", "Random thoughts", "Idea"];

const initialState = {
  taskData: {
    // 1662907031392: {
    //   id: 1662907031392,
    //   Name: "Shopping list",
    //   Created: new Date(1662907031392).toLocaleDateString(),
    //   Category: "Task",
    //   Content: "Tomatoes, bread",
    //   Dates: "",
    // },
    // 1662907031393: {
    //   id: 1662907031393,
    //   Name: "The theory",
    //   Created: new Date(1662907031393).toLocaleDateString(),
    //   Category: "Random thoughts",
    //   Content: "The theory ...",
    //   Dates: "",
    // },
    // 1662907031394: {
    //   id: 1662907031394,
    //   Name: "New feature",
    //   Created: new Date(1662907031394).toLocaleDateString(),
    //   Category: "Idea",
    //   Content: "Implement new feature",
    //   Dates: "",
    // },
  },
  taskDataArchive: {},
  taskDataSummary: "",
  category
};

function getDates(str) {
  const cond = /\s|\n/;
  if (str.length > 0) {
    const arr = str
      .split(cond)
      .map((it) => +new Date(it))
      .filter((it) => typeof it === "number" && it)
      .sort()
      .map((it) => new Date(it).toLocaleDateString())
      .join(", ");
    return arr;
  } else {
    return "";
  }
}

function sortData(data) {
  return Object.keys(data).sort((a, b) => b - a).reduce((acc,rec) => {
    return { ...acc, [rec]: data[rec] }
  },{})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        taskData: sortData(action.newTaskData),
      };
    }
    case SUMMARY: {
      return {
        ...state,
        taskDataSummary: sortData(action.taskDataSummary),
      };
    }
    case ADD_TASK_TO_ARCHIVE: {
      return {
        ...state,
        taskData: sortData(action.newTaskData),
        taskDataArchive: sortData(action.newTaskDataArchive),
      };
    }
    case UNARCHIVE_TASK: {
      return {
        ...state,
        taskData: sortData(action.newTaskData),
        taskDataArchive: sortData(action.newTaskDataArchive),
      };
    }
    case ADD_TASK: {
      return {
        ...state,
        taskData: sortData(action.newTaskData),
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        taskData: sortData(action.newTaskData),
      };
    }
    default:
      return state;
  }
};

export function getTasks() {
  return (dispatch) => {
    return axios('api/v1/notes').then(({data}) => {
      const newTaskData = data.taskData
       dispatch({
         type: GET_TASKS,
         newTaskData,
       });
    })
  }
}

export function summary() {
  return (dispatch) => {
    return axios('api/v1/notes/stats').then(({data}) => {
      const taskDataSummary = data.summaryAll
      dispatch({
        type: SUMMARY,
        taskDataSummary
      });
    })
  };
}

export function addTaskToArchive(taskId) {
  return (dispatch, getState) => {
    const {taskData, taskDataArchive} = getState().reducer
    const newTaskDataArchive = { ...taskDataArchive, [taskId]: taskData[taskId]}
    const newTaskData = taskData
    delete newTaskData[taskId]
    dispatch({
      type: ADD_TASK_TO_ARCHIVE,
      newTaskData,
      newTaskDataArchive
    })
  }
}
export function unarchiveTask(taskId) {
  return (dispatch, getState) => {
    const {taskData, taskDataArchive} = getState().reducer
    const newTaskData = { ...taskData, [taskId]: taskDataArchive[taskId]}
    const newTaskDataArchive = taskDataArchive
    delete newTaskDataArchive[taskId]
    dispatch({
      type: UNARCHIVE_TASK,
      newTaskData,
      newTaskDataArchive
    })
  }
}
export function deleteTask(taskId) {
  return (dispatch, getState) => {
    const { taskData } = getState().reducer
     const newTaskData = taskData;
     delete newTaskData[taskId];
     dispatch({
       type: DELETE_TASK,
       newTaskData
     });
  }
}
export function addTask(task) {
  return (dispatch, getState) => {
    const { taskData } = getState().reducer;
    task.Dates = getDates(task.Content)
    const newTaskData = { ...taskData, [task.id]: task}
    dispatch({
      type: ADD_TASK,
      newTaskData
    });
  };
}