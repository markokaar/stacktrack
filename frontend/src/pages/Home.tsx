import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Task from "../components/Task";
import TitleBar from "../components/TitleBar";
import TaskService from "../TaskService";
import ITask from "../ITask";

// import exampleTasksData from "../exampleTasksData.json";

const Home = ({
  selectedMenuButton,
}: {
  selectedMenuButton: "LIST" | "DONE" | "TRASH";
}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const updateTasks = () => {
    TaskService.getAllTasks()
      .then((response) => {
        setTasks(response.data.reverse());
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    updateTasks();
  }, []);

  const togglePriority = (id: number, newPriority: string) => {
    let updatedList = tasks.map((task) => {
      if (task.id == id) {
        let updatedTask = { ...task, priority: newPriority };
        TaskService.updateTask(id, updatedTask);
        return updatedTask;
      }
      return task;
    });

    setTasks(updatedList);
  };

  return (
    <>
      {selectedMenuButton === "DONE" && (
        <TitleBar
          title="Tasks Done"
          isTrash={false}
          updateTasks={updateTasks}
        />
      )}
      {selectedMenuButton === "TRASH" && (
        <TitleBar title="Trash" isTrash={true} updateTasks={updateTasks} />
      )}
      <ListGroup className="shadow-sm">
        {tasks.map(
          (task) =>
            task.status === selectedMenuButton && (
              // ...task
              <Task
                key={task.id}
                task={task}
                togglePriority={togglePriority}
                updateTasks={updateTasks}
              />
            )
        )}
      </ListGroup>
    </>
  );
};

export default Home;
