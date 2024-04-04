import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styles/AdditionalInfo.css";

const NewJobPosting = () => {
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
    recruiterId: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
  };

  const handleLocationChange = (e) => {
    setJobPost({
      ...jobPost,
      location: Array.from(e.target.selectedOptions, (option) => option.value),
    });
  };

  const {
    jobId,
    jobTitle,
    location,
    employmentType,
    postingDate,
    expirationDate,
    jobDescription,
    salaryMin,
    salaryMax,
    skills,
    qualifications,
    experience,
    recruiterId,
  } = jobPost;

  return (
    <Container>
      <Row className="justify-content-center m-3">
        <Col md={8}>
          <div className="d-flex justify-content-between align-items-center mb-4 ">
            <Button
              variant="light"
              onClick={() => navigate(-1)}
              className="me-3"
            >
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
                value={jobId}
                onChange={(e) => setJobPost({ ...jobPost, jobId: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJobTitle">
              <Form.Label>Job Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) => setJobPost({ ...jobPost, jobTitle: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location *</Form.Label>
              <Form.Select
                multiple
                value={location}
                onChange={handleLocationChange}
              >
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Houston">Houston</option>
                <option value="Miami">Miami</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmploymentType">
              <Form.Label>Employment Type</Form.Label>
              <Form.Select
                value={employmentType}
                onChange={(e) => setJobPost({ ...jobPost, employmentType: e.target.value })}
              >
                <option value="">Select Employment Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPostingDate">
              <Form.Label>Posting Date</Form.Label>
              <Form.Control
                type="date"
                value={postingDate}
                onChange={(e) => setJobPost({ ...jobPost, postingDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExpirationDate">
              <Form.Label>Expiration Date *</Form.Label>
              <Form.Control
                type="date"
                value={expirationDate}
                onChange={(e) => setJobPost({ ...jobPost, expirationDate: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobPost({ ...jobPost, jobDescription: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSalary">
              <Form.Label>Salary Range *</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={salaryMin}
                    onChange={(e) => setJobPost({ ...jobPost, salaryMin: e.target.value })}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={salaryMax}
                    onChange={(e) => setJobPost({ ...jobPost, salaryMax: e.target.value })}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSkills">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter skills required"
                value={skills}
                onChange={(e) => setJobPost({ ...jobPost, skills: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQualifications">
              <Form.Label>Qualifications Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter qualifications required"
                value={qualifications}
                onChange={(e) => setJobPost({ ...jobPost, qualifications: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>Experience Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter experience required"
                value={experience}
                onChange={(e) => setJobPost({ ...jobPost, experience: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRecruiterId">
              <Form.Label>Recruiter ID *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recruiter ID"
                value={recruiterId}
                onChange={(e) => setJobPost({ ...jobPost, recruiterId: e.target.value })}
                required
              />
            </Form.Group>
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
};

export default NewJobPosting;
