import axios from "axios";

const GET_TASKS = "GET_TASKS";
const ADD_TASK_TO_ARCHIVE = "ADD_TASK_TO_ARCHIVE";
const UNARCHIVE_TASK = "UNARCHIVE_TASK";
const DELETE_TASK = "DELETE_TASK";
const ADD_TASK = "ADD_TASK";
const SUMMARY = "SUMMARY";

const category = ["Task", "Random thoughts", "Idea"];

const initialState = {
  taskData: {},
  taskDataArchive: {},
  taskDataSummary: "",
  category,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        taskData: action.newTaskData,
      };
    }
    case SUMMARY: {
      return {
        ...state,
        taskDataSummary: action.taskDataSummary,
      };
    }
    case ADD_TASK_TO_ARCHIVE: {
      return {
        ...state,
        taskData: action.newTaskData,
        taskDataArchive: action.newTaskDataArchive,
      };
    }
    case UNARCHIVE_TASK: {
      return {
        ...state,
        taskData: action.newTaskData,
        taskDataArchive: action.newTaskDataArchive,
      };
    }
    case ADD_TASK: {
      return {
        ...state,
        taskData: action.newTaskData,
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        taskData: action.newTaskData,
      };
    }
    default:
      return state;
  }
};

export function getTasks() {
  return (dispatch) => {
    return axios("api/v1/notes").then(({ data }) => {
      const newTaskData = data.taskData;
      dispatch({
        type: GET_TASKS,
        newTaskData,
      })
    }).catch(err => {
      alert(JSON.stringify(err.response.data));
    });
  };
}

export function summary() {
  return (dispatch) => {
    return axios("api/v1/notes/stats").then(({ data }) => {
      const taskDataSummary = data.summaryAll;
      dispatch({
        type: SUMMARY,
        taskDataSummary,
      });
    }).catch(err => {
      alert(JSON.stringify(err.response.data));
    })
  };
}

export function addTaskToArchive(taskId) {
  return (dispatch) => {
    return axios.patch(
      `/api/v1/notes/${taskId}`,
      { type: 'archive' },
      { headers: { "Content-type": "application/json" } }
    ). then(({ data }) => {
      const newTaskData = data.taskData
      const newTaskDataArchive = data.taskDataArchive
      dispatch({
        type: ADD_TASK_TO_ARCHIVE,
        newTaskData,
        newTaskDataArchive,
      })
    }).catch((err) => {
      alert(JSON.stringify(err.response.data))
    })
  };
}

export function unarchiveTask(taskId) {
  return (dispatch) => {
    return axios.patch(
      `/api/v1/notes/${taskId}`,
      { type: "unarchive" },
      { headers: { "Content-type": "application/json" } }
    ). then(({ data }) => {
      const newTaskData = data.taskData
      const newTaskDataArchive = data.taskDataArchive
      dispatch({
        type: UNARCHIVE_TASK,
        newTaskData,
        newTaskDataArchive,
      });
    }).catch(err => {
      alert(JSON.stringify(err.response.data));
    })
  };
}

export function deleteTask(taskId) {
  return (dispatch) => {
    return axios.delete(`api/v1/notes/${taskId}`).then(({ data }) => {
      const newTaskData = data.taskData;
      dispatch({
        type: DELETE_TASK,
        newTaskData,
      });
    }).catch(err => {
      alert(JSON.stringify(err.response.data));
    })
  };
}

export function addTask(task) {
  return (dispatch) => {
    return axios
      .post(
        "/api/v1/notes",
        { task },
        { headers: { "Content-type": "application/json" } }
      )
      .then(({ data }) => {
        const newTaskData = data.taskData;
        dispatch({
          type: ADD_TASK,
          newTaskData,
        });
      }).catch(err => {
      alert(JSON.stringify(err.response.data));
    })
  };
}
