import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDeleteApplicationMutation } from '../services/appApi';

function WithdrawApplicationModal(props) {
    const { user } = useSelector((state) => state.user);
    const [show, setShow] = useState(false);
    const [deleteApplication] = useDeleteApplicationMutation();

    // Modal functions to show and hide the Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleWithdraw(e) {
        e.preventDefault();

        await deleteApplication({ jobID: props.jobID, seekerID: user.seekerID }).then((response) => {
            if (response && response.data) {
                console.log(response.data.message);
                alert(response.data.message);
                handleClose();
                window.location.reload();
                return;
            } else if (response && response.error) {
                console.log(response.error.data.error);
                alert(response.error.data.error);
                return;
            }});
    }

    return (
        <>
            <Button variant='warning' onClick={handleShow}>Withdraw</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Withdraw Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to withdraw your application?</p>
                    <p><strong>Note:</strong> This action is irreversible.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={handleClose}>No</Button>
                    <Button className="btn btn-primary" onClick={handleWithdraw}>Yes, Withdraw</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default WithdrawApplicationModal