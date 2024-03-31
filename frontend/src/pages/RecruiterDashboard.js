import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function RecruiterDashboard() {
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center p-4">
      <Row className="w-80 bg-light rounded-3 shadow-xl">
        <Card className="border">
          <Card.Body className="p-0">
            <Row className="bg-primary rounded-top py-3 px-4"> 
              <Col className="d-flex justify-content-end ms-auto"> 
                <Link
                  to="/new-job-posting"
                  className="btn btn-light d-flex align-items-center text-decoration-none"
                >
                  <HiOutlinePlusSmall className="me-2" /> New job posting
                </Link>
              </Col>
            </Row>
            <Row className="p-5">
              <Col md={6} className="p-0">
                <Card className="h-100 shadow mx-3">
                  <Card.Body className="d-flex align-items-center justify-content-between p-5">
                    <div className="d-flex align-items-center">
                      <FaClipboardCheck className="me-3 text-primary display-4" /> 
                      <div>
                        <h5 className="mb-0">Job postings:</h5>
                        <span className="fw-bold fs-4">10</span> 
                      </div>
                    </div>
                    <Link to="/job-posting" variant="primary" className="px-4 mx-2 btn btn-primary">
                      View
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="p-0">
                <Card className="h-100 shadow mx-3"> 
                  <Card.Body className="d-flex align-items-center justify-content-between p-5">
                    <div className="d-flex align-items-center">
                      <FaUser className="me-3 text-primary display-4" /> 
                      <div>
                        <h5 className="mb-0">Job applicants:</h5>
                        <span className="fw-bold fs-4">10</span> 
                      </div>
                    </div>
                    <Button variant="primary" className="px-4 mx-2">
                      View
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default RecruiterDashboard;
