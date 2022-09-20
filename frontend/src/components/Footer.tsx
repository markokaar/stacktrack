import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container className="text-muted mt-4">
      <Row className="border-top mx-1">
        <Col className="px-2">
          <p>StackTrack / 2022</p>
        </Col>
        <Col className="col-auto px-2">
          <Link to="/" className="link-secondary mx-1">
            Home
          </Link>

          <Link to="/about" className="link-secondary">
            About
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
