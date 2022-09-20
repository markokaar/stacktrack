import React from "react";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import TitleBar from "../components/TitleBar";

const About = () => {
  return (
    <>
      <TitleBar title="About" isTrash={false} updateTasks={() => {}} />
      <Container className="mt-2">
        <h3>Lorem ipsum</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat dui,
          tempus eu accumsan in, iaculis vitae ligula. Ut vehicula facilisis
          lorem, sit amet rutrum odio laoreet eget. Integer porta aliquam erat.
          Suspendisse sollicitudin arcu non justo semper, in imperdiet lectus
          convallis.
        </p>
        <h3>Suspendisse vulputate</h3>
        <ul>
          <li>
            Donec sit amet tortor consectetur, consequat dui nec, varius magna.
          </li>
          <li>
            Aliquam viverra mi tincidunt convallis lacinia. Curabitur ut finibus
            ligula, at lacinia nunc.
          </li>
          <li>Nunc venenatis est et viverra facilisis.</li>
          <li>
            Donec eget ornare ligula, non mattis quam. Ut hendrerit elit non
            pellentesque tincidunt.
          </li>
        </ul>
        <h3>Fusce auctor</h3>
        <Row className="align-items-center">
          <Col className="col-auto">
            <img src="src/assets/react.svg" alt="React Logo" width={100} />
          </Col>
          <Col>
            <p>
              Morbi suscipit neque in felis auctor eleifend. Pellentesque id
              purus urna. Nunc dictum est non nibh rhoncus suscipit. Fusce
              auctor pretium ligula, nec consectetur arcu tempus sit amet.
              Quisque gravida ac ante ac rutrum. Nulla ornare iaculis sodales.
              In hac habitasse platea dictumst.
            </p>
          </Col>
        </Row>

        <figure className="text-end pt-3">
          <blockquote className="blockquote">
            <p>
              “I hear and I forget.
              <br />I see and I remember.
              <br />I do and I understand.”
            </p>
          </blockquote>
          <figcaption className="blockquote-footer">Confucius</figcaption>
        </figure>
      </Container>
    </>
  );
};

export default About;
