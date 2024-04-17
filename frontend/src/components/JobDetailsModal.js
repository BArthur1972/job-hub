import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function JobDetailsModal({ jobID, companyName, jobTitle, experienceLevels, locations, postedDate, jobType, skills, salary, description }) {
    const [show, setShow] = useState(false);

    // Modal functions to show and hide the Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='outline-primary' onClick={handleShow}>View</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">{jobTitle} at {companyName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Job ID:</strong> {jobID}</p>
                    <p><strong>Company:</strong> {companyName}</p>
                    <p><strong>Experience Level(s):</strong> {experienceLevels}</p>
                    <p><strong>Location(s):</strong> {locations}</p>
                    <p><strong>Posted:</strong> {postedDate}</p>
                    <p><strong>Job Type:</strong> {jobType}</p>
                    <p><strong>Skills:</strong> {skills.join(", ")}</p>
                    <p><strong>Salary:</strong> {salary}</p>
                    <p><strong>Description:</strong> {description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default JobDetailsModal;