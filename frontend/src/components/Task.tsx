import React, { ChangeEvent } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import {
  FaAngleDown,
  FaAngleRight,
  FaCheck,
  FaCog,
  FaTrashAlt,
  FaUndo,
} from "react-icons/fa";
import ITask from "../ITask";
import TaskService from "../TaskService";
import ColorSwitcher from "../utils/ColorSwitcher";
import PrioritySwitchButtons from "./PrioritySwitchButtons";
import TaskButton from "./TaskButton";
import TaskModal from "./TaskModal";

type statusType = "LIST" | "DONE" | "TRASH";

type taskPropsType = {
  task: ITask;
  togglePriority: (id: number, newPriority: string) => void;
  updateTasks: () => void;
};

const Task = (props: taskPropsType) => {
  const { task, togglePriority, updateTasks } = props;
  const { id, name, description, priority, status } = task;

  const handleTogglePriority = (newPriority: string) => {
    //console.log("Priority toggle: " + newPriority);
    togglePriority(id, newPriority);
  };

  // Allowed statuses: LIST DONE TRASH
  const changeStatus = (newStatus: statusType) => {
    let status: statusType = newStatus;
    TaskService.updateTask(id, {
      id,
      name,
      description,
      priority,
      status,
    }).then(() => updateTasks());
  };

  const taskToDestroy = () => {
    //console.log("To destroy: " + id);
    TaskService.deleteTask(id).then(() => updateTasks());
  };

  return (
    <div
      key={id}
      className="border border-bottom-1 border-start-0 border-end-0 border-top-0"
    >
      <Button
        data-bs-target={"#collapseElement" + id}
        className={
          "py-3 rounded-0 list-group-item list-group-item-action text-bg-light border border-5 border-bottom-0 border-top-0 border-" +
          ColorSwitcher(priority)
        }
        aria-current="true"
        data-bs-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls={"collapseElement" + id}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-0">{name}</h5>
          <span>
            <FaAngleRight />
          </span>
          {/* <Link
            className="form-check-input me-1 mt-0 p-3"
            type="button"
            value=""
            checked={done}
            onChange={() => {setDone((oldValue) => !oldValue)}}
            id="taskCheckbox"
          /> */}
        </div>
      </Button>

      <div className="collapse" id={"collapseElement" + id}>
        <div className="card card-body ps-4 pt-2 pe-4 pb-3 rounded-0">
          {description}
          <Row className="mt-2">
            <Col className="me-auto">
              {status !== "TRASH" && (
                <PrioritySwitchButtons
                  taskId={id}
                  activePriority={priority}
                  handleTogglePriority={handleTogglePriority}
                />
              )}
            </Col>

            <Col className="col-auto">
              {/* Mark as 'done' button */}
              {status === "LIST" && (
                <TaskButton
                  variant={"success"}
                  onClickHandler={() => changeStatus("DONE")}
                  icon={<FaCheck size={22} />}
                />
              )}

              {/* 'undo' button */}
              {(status === "TRASH" || status === "DONE") && (
                <TaskButton
                  variant={"warning"}
                  onClickHandler={() => changeStatus("LIST")}
                  icon={<FaUndo size={22} />}
                />
              )}

              {/* 'settings' button */}
              {status !== "TRASH" && (
                <Button
                  type="button"
                  variant="primary"
                  className="me-1"
                  data-bs-toggle="modal"
                  data-bs-target={"#staticBackdrop" + id}
                >
                  <FaCog size={22} />
                </Button>
              )}

              {/* 'destroy' OR 'trash' button */}
              {(status === "TRASH" && (
                <TaskButton
                  variant={"dark"}
                  onClickHandler={taskToDestroy}
                  icon={<FaTrashAlt size={22} />}
                />
              )) || (
                <TaskButton
                  variant={"danger"}
                  onClickHandler={() => changeStatus("TRASH")}
                  icon={<FaTrashAlt size={22} />}
                />
              )}
            </Col>
          </Row>
          <TaskModal
            taskId={id}
            title={"Edit task"}
            taskPriority={priority}
            taskStatus={status}
            updateTasks={updateTasks}
            taskNameOld={name}
            taskDescriptionOld={description}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
