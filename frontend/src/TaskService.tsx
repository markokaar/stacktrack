import axios from "axios";
import ITask from "./ITask";

const TASK_BASE_REST_API_URL = "http://localhost:8080/api/v1/tasks";

class TaskService {
  getAllTasks() {
    return axios.get(TASK_BASE_REST_API_URL);
  }

  createTask(task: ITask) {
    return axios
      .post(TASK_BASE_REST_API_URL, task)
      .catch((error) => console.error("Failed to create new task: " + error));
  }

  updateTask(id: number, task: ITask) {
    return axios
      .put(TASK_BASE_REST_API_URL + "/" + id, task)
      .catch((error) =>
        console.error(
          "Failed to update task with ID: " + id + ". Error: " + error
        )
      );
  }

  deleteTask(id: number) {
    return axios
      .delete(TASK_BASE_REST_API_URL + "/" + id)
      .catch((error) =>
        console.error(
          "Failed to delete task with ID: " + id + ". Error: " + error
        )
      );
  }

  emptyTrash() {
    return axios
      .post(TASK_BASE_REST_API_URL + "/empty-trash")
      .catch((error) => console.error("Error when emptying trash: " + error));
  }
}

export default new TaskService();
