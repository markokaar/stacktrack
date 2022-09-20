import React from "react";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import Priorities from "../utils/Priorities";

type prioritySwitcherPropsType = {
  taskId: number;
  activePriority: string;
  handleTogglePriority: (newPriority: string) => void;
};

const PrioritySwitcher = (props: prioritySwitcherPropsType) => {
  const { taskId, activePriority, handleTogglePriority } = props;
  const priorities = Priorities();

  const prioritySwitched = (newPriority: string) => {
    //console.log("New priority: " + newPriority);
    handleTogglePriority(newPriority);
  };

  return (
    <ButtonGroup className="shadow-sm">
      {priorities.map((priorityType, buttonId) => (
        <ToggleButton
          key={`${taskId}-${buttonId}`}
          id={`priority-${taskId}-${buttonId}`}
          type="radio"
          variant={"outline-" + priorityType.color}
          name={`priority-${taskId}`}
          value={priorityType.value}
          checked={activePriority === priorityType.value}
          onChange={(e) => prioritySwitched(e.currentTarget.value)}
        >
          {priorityType.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default PrioritySwitcher;
