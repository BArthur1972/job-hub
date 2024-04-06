import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./styles/AdditionalInfo.css";
import { useCreateJobListingMutation } from "../services/appApi";
import { useSelector } from "react-redux";

function NewJobPosting() {
  const [jobPost, setJobPost] = useState({
    jobID: "",
    jobTitle: "",
    jobDescription: "",
    companyID: "",
    location: "",
    employmentType: "",
    postingDate: "",
    salary: "",
    skillsRequired: "",
    experienceRequired: "",
    qualificationsRequired: "",
    expirationDate: "",
    recruiterID: "",
  });

  const navigate = useNavigate();

  const [createJobListing] = useCreateJobListingMutation();

  const { user } = useSelector((state) => state.user);

  async function handleSubmit(e) {
    e.preventDefault();
    jobPost.companyID = user.companyID;
    jobPost.recruiterID = user.recruiterID;
    await createJobListing(jobPost).then((response) => {
      if (response && response.data) {
        console.log("Job posted successfully");
        console.log(response.data);
        alert("Job posted successfully");
        navigate(-1);
      } else if (response.error) {
        console.log("Error posting job here");
        console.log(response.error);
        alert(response.error.data.error);
      }
    });
  }

  const {
    jobID,
    jobTitle,
    jobDescription,
    location,
    employmentType,
    postingDate,
    salary,
    skillsRequired,
    experienceRequired,
    qualificationsRequired,
    expirationDate,
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
            <Form.Group className="mb-3" controlId="formJobID">
              <Form.Label>Job ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job ID"
                value={jobID}
                onChange={(e) =>
                  setJobPost({ ...jobPost, jobID: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJobTitle">
              <Form.Label>Job Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={(e) =>
                  setJobPost({ ...jobPost, jobTitle: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location *</Form.Label>
              <Form.Select
                value={location}
                onChange={(e) =>
                  setJobPost({ ...jobPost, location: e.target.value })
                }
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
                onChange={(e) =>
                  setJobPost({ ...jobPost, employmentType: e.target.value })
                }
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
                onChange={(e) =>
                  setJobPost({ ...jobPost, postingDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExpirationDate">
              <Form.Label>Expiration Date *</Form.Label>
              <Form.Control
                type="date"
                value={expirationDate}
                onChange={(e) =>
                  setJobPost({ ...jobPost, expirationDate: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={jobDescription}
                onChange={(e) =>
                  setJobPost({ ...jobPost, jobDescription: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSalary">
              <Form.Label>Salary Range *</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="string"
                    placeholder="Min"
                    value={salary}
                    onChange={(e) =>
                      setJobPost({ ...jobPost, salary: e.target.value })
                    }
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
                value={skillsRequired}
                onChange={(e) =>
                  setJobPost({ ...jobPost, skillsRequired: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQualifications">
              <Form.Label>Qualifications Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter qualifications required"
                value={qualificationsRequired}
                onChange={(e) =>
                  setJobPost({
                    ...jobPost,
                    qualificationsRequired: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>Experience Required</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter experience required"
                value={experienceRequired}
                onChange={(e) =>
                  setJobPost({
                    ...jobPost,
                    experienceRequired: e.target.value,
                  })
                }
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
