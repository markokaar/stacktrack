import React, { ReactElement } from "react";
import Button from "react-bootstrap/esm/Button";

type taskIconPropsType = {
  variant: string;
  onClickHandler: () => void;
  icon: ReactElement;
};

const TaskIcon = (props: taskIconPropsType) => {
  return (
    <Button
      variant={props.variant}
      className="me-1"
      onClick={props.onClickHandler}
    >
      {props.icon}
    </Button>
  );
};

export default TaskIcon;
