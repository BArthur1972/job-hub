import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styles/AdditionalInfo.css";


function NewJobPosting() {
    const [jobPost, setJobPost] = useState({
      jobId: "",
      jobTitle: "",
      location: [],
      employmentType: "",
      postingDate: "",
      expirationDate: "",
      jobDescription: "",
      salaryMin: "",
      salaryMax: "",
      skills: "",
      qualifications: "",
      experience: "",
      recruiterId: ""
    });
  
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your submission logic here
    };
  
    const handleLocationChange = (e) => {
      setJobPost({ ...jobPost, location: Array.from(e.target.selectedOptions, (option) => option.value) });
    };
  
    // Define event handlers for other form inputs
    // Example:
    // const handleJobTitleChange = (e) => {
    //   setJobPost({ ...jobPost, jobTitle: e.target.value });
    // };
  
    return (
      <Container>
        <Row className="justify-content-center m-3">
          <Col md={8}>
            <div className="d-flex justify-content-between align-items-center mb-4 ">
              <Button variant="light" onClick={() => navigate(-1)} className="me-3">
                <FaArrowLeft /> Back
              </Button>
              <h3 className="mb-0">Post Your Job Requirements</h3>
            </div>
            <Form onSubmit={handleSubmit} className="form-box">
              <Form.Group className="mb-3" controlId="formJobId">
                <Form.Label>Job ID *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job ID"
                  value={jobPost.jobId}
                  onChange={(e) => setJobPost({ ...jobPost, jobId: e.target.value })}
                  required
                />
              </Form.Group>
              {/* Other form fields */}
              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location *</Form.Label>
                <Form.Select
                  multiple
                  value={jobPost.location}
                  onChange={handleLocationChange}
                >
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Houston">Houston</option>
                  <option value="Miami">Miami</option>
                </Form.Select>
              </Form.Group>
              {/* Other form fields */}
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default NewJobPosting;
