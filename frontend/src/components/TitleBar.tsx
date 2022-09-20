import React, { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskService from "../TaskService";

type titleBarPropsType = {
  title: string;
  isTrash: boolean;
  updateTasks: () => void;
};

const TitleBar = (props: titleBarPropsType) => {
  const handleDeleteAll = () => {
    //console.log("Delete All");
    TaskService.emptyTrash().then(props.updateTasks);
  };

  return (
    <Row className="text-bg-secondary m-0 px-2 py-1">
      <Col>
        <h4 className="mb-0">{props.title}</h4>
      </Col>
      {props.isTrash && (
        <Col className="col-auto">
          <Link
            to=""
            type="button"
            className="btn btn-sm btn-outline-dark"
            onClick={handleDeleteAll}
          >
            Delete all
          </Link>
        </Col>
      )}
    </Row>
  );
};

export default TitleBar;
