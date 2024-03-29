import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styles/AdditionalInfo.css";

function NewJobPosting() {
  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState([]);
  const [employmentType, setEmploymentType] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [jobDescription, setJobDescription] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [skills, setSkills] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [recruiterId, setRecruiterId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
  };

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
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJobTitle">
              <Form.Label>Job Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location *</Form.Label>
              <Form.Select
                multiple
                value={location}
                onChange={(e) => setLocation(Array.from(e.target.selectedOptions, (option) => option.value))}
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
                onChange={(e) => setEmploymentType(e.target.value)}
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
                onChange={(e) => setPostingDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExpirationDate">
              <Form.Label>Expiration Date *</Form.Label>
              <Form.Control
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
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
                    onChange={(e) => setSalaryMin(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
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
                onChange={(e) => setSkills(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQualifications">
              <Form.Label>Qualifications Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter qualifications required"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>Experience Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter experience required"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRecruiterId">
              <Form.Label>Recruiter ID *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recruiter ID"
                value={recruiterId}
                onChange={(e) => setRecruiterId(e.target.value)}
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
}

export default NewJobPosting;
