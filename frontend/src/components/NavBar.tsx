import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import {
  FaAngleLeft,
  FaClipboardCheck,
  FaClipboardList,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import TaskModal from "./TaskModal";

const NavBar = () => {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  const pathName = usePathname();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Stack<span className="text-info">Track</span>
          </Link>

          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              {(pathName == "/" && (
                <FaClipboardList size={30} className="text-info" />
              )) || <FaClipboardList size={30} />}
            </Link>

            <Link to="/done" className="nav-link">
              {(pathName == "/done" && (
                <FaClipboardCheck size={30} className="text-info" />
              )) || <FaClipboardCheck size={30} />}
            </Link>

            <Link to="/trash" className="nav-link">
              {(pathName == "/trash" && (
                <FaTrashAlt size={30} className="text-info" />
              )) || <FaTrashAlt size={30} />}
            </Link>
          </Nav>

          {(pathName !== "/about" && (
            <Button
              type="button"
              variant="info"
              className="me-1 ps-1 pe-2 d-flex flex-row"
              data-bs-toggle="modal"
              data-bs-target={"#staticBackdrop" + 0}
            >
              <FaPlus className="ms-1 me-1 mt-1" />
              <span className="m-0">New Task</span>
            </Button>
          )) || (
            <Link
              to={"/"}
              type="button"
              className="btn btn-danger me-1 ps-1 pe-2 d-flex flex-row"
            >
              <FaAngleLeft className="ms-1 me-1 mt-1" />
              <span className="m-0">Back</span>
            </Link>
          )}
          <TaskModal
            taskId={0}
            title={"New task"}
            taskPriority={"2"}
            taskStatus={"LIST"}
            taskNameOld={""}
            taskDescriptionOld={""}
          />
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
