import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { FaClipboardCheck, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetNumberOfApplicantsByRecruiterIdMutation, useGetNumberOfJobListingsByRecruiterIdMutation } from "../services/appApi";

function RecruiterDashboard() {
  const { user } = useSelector((state) => state.user);
  const [numberOfJobListings, setNumberOfJobListings] = useState(0);
  const [numberOfApplicants, setNumberOfApplicants] = useState(0);
  const [getNumberOfJobListingsByRecruiterId] = useGetNumberOfJobListingsByRecruiterIdMutation();
  const [getNumberOfApplicantsByRecruiterId] = useGetNumberOfApplicantsByRecruiterIdMutation();

  useEffect(() => {
	getNumberOfJobListingsByRecruiterId(user.recruiterID)
	  .then((response) => {
		console.log(response);
		setNumberOfJobListings(response.data.count);
	  });
	getNumberOfApplicantsByRecruiterId(user.recruiterID)
	  .then((response) => {
		console.log(response);
		setNumberOfApplicants(response.data.count);
	  });
  }, [getNumberOfApplicantsByRecruiterId, getNumberOfJobListingsByRecruiterId, user.recruiterID]);

  return (
    <Container className="flex justify-content-center align-items-center p-4 mt-5">
      <Row className="w-80 bg-light rounded-3 shadow">
        <Col className="text-center text-md-left">
          <h1 className="text-4xl text-black font-bold mb-2">
            Welcome Back {user.firstName}!
          </h1>
          <p className="text-black font-medium">
            Manage your job postings and applicants here.
          </p>
        </Col>
      </Row>
      <Row className="w-80 bg-light rounded-3 shadow">
        <Card className="border-0">
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
                        <span className="fw-bold fs-4">{numberOfJobListings}</span>
                      </div>
                    </div>
                    <Link
                      to="/job-posting"
                      variant="primary"
                      className="px-4 mx-2 btn btn-primary"
                    >
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
                        <span className="fw-bold fs-4">{numberOfApplicants}</span>
                      </div>
                    </div>
                    <Link
                      to="/job-applicant"
                      variant="primary"
                      className="px-4 mx-2 btn btn-primary"
                    >
                      View
                    </Link>
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
