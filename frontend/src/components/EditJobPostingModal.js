import React, { useState } from 'react';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { locations } from '../pages/data/locations';
import { useUpdateJobListingByIdMutation } from '../services/appApi';

function EditJobPostingModal(props) {
    const [show, setShow] = useState(false);
    const [jobPost, setJobPost] = useState(props.jobListing);
    const [updateJobListingById] = useUpdateJobListingByIdMutation();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            console.log(jobPost);
            await updateJobListingById(jobPost).then((response) => {
                console.log(jobPost)
                if (response && response.data) {
                    console.log(response.data.message);
                    alert(response.data.message);
                    handleClose();
                } else {
                    console.log(response.error.data.error);
                    alert(response.error.data.error);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    // Modal functions to show and hide the Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button onClick={handleShow}>
                <i className="bi bi-pencil-square"></i>
                Edit
            </Button>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job Posting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className="form-box">
                        <Form.Group className="mb-3" controlId="formJobID">
                            <Form.Label>Job ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter job ID"
                                value={jobPost.jobID}
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
                                value={jobPost.jobTitle}
                                onChange={(e) =>
                                    setJobPost({ ...jobPost, jobTitle: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLocation">
                            <Form.Label>Location *</Form.Label>
                            <Form.Select
                                value={jobPost.location}
                                onChange={(e) =>
                                    setJobPost({ ...jobPost, location: e.target.value })
                                }
                            >
                                {locations.map((location) => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmploymentType">
                            <Form.Label>Employment Type</Form.Label>
                            <Form.Select
                                value={jobPost.employmentType}
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
                            <Form.Label>Posting Date *</Form.Label>
                            <Form.Control
                                type="date"
                                value={jobPost.postingDate}
                                onChange={(e) =>
                                    setJobPost({ ...jobPost, postingDate: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formExpirationDate">
                            <Form.Label>Expiration Date *</Form.Label>
                            <Form.Control
                                type="date"
                                value={jobPost.expirationDate}
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
                                value={jobPost.jobDescription}
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
                                        value={jobPost.salary}
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
                                value={jobPost.skillsRequired}
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
                                value={jobPost.qualificationsRequired}
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
                                value={jobPost.experienceRequired}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditJobPostingModal;