import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { jobPostings } from "./data/jobs";
import JobPostingCard from "../components/joblist/JobPostingCard";

function UserDashboard() {
  return (
    <Container fluid className="p-0">
      {/* Main Content Column */}
      <Col md={9} lg={12} className="px-md-4 py-4 overflow-auto">
        <Container fluid>
          {/* Welcome Section */}
          <Row className="mb-5">
            <Col className="text-center text-md-left">
              <h1 className="text-4xl text-black font-bold mb-2">
                Welcome Back, Collins!
              </h1>
              <p className="text-black font-medium">
                Find exciting new opportunities tailored to your preferences.
              </p>
              {/* Actions */}
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center mt-5 gap-3 p-3">
                <div className="ms-md-5">
                  <Link to="#" className="btn btn-primary rounded-pill">
                    View More Jobs
                  </Link>
                </div>
                <div className="me-md-5">
                  <Button variant="outline-secondary" className="rounded-pill">
                    Change Preferences
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Top Matches Section */}
          <Row>
            <Col xs={12}>
              <h4 className="text-2xl text-black font-bold mb-3">
                Your Top Matches
              </h4>
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {jobPostings.map((job, index) => (
                  <Col key={index}>
                    <div>
                      <JobPostingCard {...job} />
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Container>
  );
}

export default UserDashboard;
