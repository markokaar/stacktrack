import React, { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router-dom";
import PrioritySwitchButtons from "./PrioritySwitchButtons";
import ColorSwitcher from "../utils/ColorSwitcher";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import TaskService from "../TaskService";

type statusType = "LIST" | "DONE" | "TRASH";

type taskModalPropsType = {
  taskId: number;
  title: string;
  taskPriority: string;
  taskStatus: statusType;
  taskNameOld: string;
  taskDescriptionOld: string;
  updateTasks?: () => void;
};

const TaskModal = (props: taskModalPropsType) => {
  const {
    taskId,
    title,
    taskPriority,
    taskStatus,
    taskNameOld,
    taskDescriptionOld,
    updateTasks,
  } = props;

  const [selectedPriority, setSelectedPriority] = useState(taskPriority);
  const [taskName, setTaskName] = useState(taskNameOld);
  const [taskDescription, setTaskDescription] = useState(taskDescriptionOld);

  const handleTogglePriority = (newPriority: string) => {
    //console.log("New task priority-switch: " + newPriority);
    setSelectedPriority(newPriority);
  };

  const onSubmit = () => {
    if (taskId == 0) {
      TaskService.createTask({
        id: taskId,
        name: taskName,
        description: taskDescription,
        priority: selectedPriority,
        status: taskStatus,
      }).then(() => {
        setTaskName("");
        setTaskDescription("");
        setSelectedPriority("2");
      });
    } else {
      TaskService.updateTask(taskId, {
        id: taskId,
        name: taskName,
        description: taskDescription,
        priority: selectedPriority,
        status: taskStatus,
      }).then(updateTasks);
    }
  };

  return (
    <div
      className="modal fade"
      id={"staticBackdrop" + taskId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby={"staticBackdropLabel" + taskId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div
          className={
            "modal-content border border-5 border-top-0 border-bottom-0 border-" +
            ColorSwitcher(selectedPriority)
          }
        >
          <div className="modal-header">
            <h5 className="modal-title" id={"staticBackdropLabel" + taskId}>
              {title}
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <Form>
            <div className="modal-body">
              <Form.Group className="mb-3" controlId={"taskName" + taskId}>
                <FloatingLabel
                  controlId={"floatingInput" + taskId}
                  label="Task name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter task name"
                    onChange={(e) => setTaskName(e.target.value)}
                    value={taskName}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId={"taskDescription" + taskId}
              >
                <FloatingLabel
                  controlId={"floatingInput" + taskId}
                  label="Task description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    style={{ height: "100px" }}
                    className="pb-0"
                    onChange={(e) => setTaskDescription(e.target.value)}
                    value={taskDescription}
                  />
                </FloatingLabel>
              </Form.Group>

              {/* Showing task priority-switcher only when creating 
              new task. Not displayed in task 'settings' because 
              it's already on the screen. */}
              {taskId == 0 && (
                <Form.Group
                  className="mb-0"
                  controlId={"taskPriority" + taskId}
                >
                  <Form.Label className="me-2">Task priority</Form.Label>
                  <div>
                    <PrioritySwitchButtons
                      taskId={taskId}
                      activePriority={selectedPriority}
                      handleTogglePriority={handleTogglePriority}
                    />
                  </div>
                </Form.Group>
              )}
            </div>

            <div className="modal-footer">
              <div className="text-muted">(ID: {taskId})</div>
              <Link to="" className="btn btn-danger" data-bs-dismiss="modal">
                Cancel
              </Link>
              <Link
                to="/"
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={onSubmit}
              >
                Save
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
