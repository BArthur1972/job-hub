import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDeleteJobListingByIdMutation } from '../services/appApi';

function DeleteJobPostingModal(props) {
    const { user } = useSelector((state) => state.user);
    const [show, setShow] = useState(false);
    const [deleteJobListingById] = useDeleteJobListingByIdMutation();

    // Modal functions to show and hide the Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleDelete(e) {
        e.preventDefault();

        await deleteJobListingById({jobID: props.jobListing.jobID, recruiterID: user.recruiterID}).then((response) => {
            if (response.data) {
                console.log(response.data.message);
                alert(response.data.message);
                handleClose();
                window.location.reload();
                return;
            } else if (response.error) {
                console.log(response.error.data.error);
                alert(response.error.data.error);
                return;
            }
        }).catch((error) => {
            console.log('Error deleting job listing: ', error);
        });
    }

    return (
        <>
            <Button variant='danger' onClick={handleShow}>Delete</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Job Posting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete your account?</p>
                    <p><strong>Note:</strong> This will also delete all applications associated with this job posting.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={handleClose}>No</Button>
                    <Button className="btn btn-primary" onClick={handleDelete}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteJobPostingModal;